import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchResults } from "./SearchResults";

vi.mock("./FilterTabs", () => ({
  __esModule: true,
  default: (props: object) => (
    <div data-testid="FilterTabs">{JSON.stringify(props)}</div>
  ),
}));
vi.mock("./MediaCard", () => ({
  __esModule: true,
  default: (props: object) => (
    <div data-testid="MediaCard">{JSON.stringify(props)}</div>
  ),
}));
vi.mock("./Pagination", () => ({
  __esModule: true,
  default: (props: { onNextPage: () => void }) => (
    <button data-testid="next-btn" onClick={props.onNextPage}>
      Next
    </button>
  ),
}));
vi.mock("./SearchSkeleton", () => ({
  __esModule: true,
  default: () => <div data-testid="SearchSkeleton" />,
}));

import { apiClient } from "@/lib/api";
vi.mock("@/lib/api", () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

function withQueryClient(children: React.ReactNode) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("SearchResults", () => {
  const mockResults = [
    { media_type: "movie", id: 1, title: "Movie 1" },
    { media_type: "tv", id: 2, name: "TV 1" },
    { media_type: "person", id: 3, name: "Person 1" },
  ];
  const mockApiResponse = {
    page: 1,
    results: mockResults,
    total_pages: 2,
    total_results: 3,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (apiClient.get as Mock).mockResolvedValue({
      data: mockApiResponse,
    });
  });

  function WrapperWithQuery(q?: string, value?: string, page?: string) {
    const search = [
      q ? `${q}=${value || "test"}` : null,
      page ? `page=${page}` : null,
    ]
      .filter(Boolean)
      .join("&");
    return ({ children }: { children: React.ReactNode }) => (
      <MemoryRouter initialEntries={[`/search?${search}`]}>
        {withQueryClient(children)}
      </MemoryRouter>
    );
  }

  it("renders loading state", () => {
    (apiClient.get as Mock).mockImplementation(() => new Promise(() => {}));
    render(<SearchResults />, { wrapper: WrapperWithQuery("q", "test") });
    expect(screen.getByTestId("SearchSkeleton")).toBeInTheDocument();
  });

  it("renders results and passes correct props to children", async () => {
    render(<SearchResults />, { wrapper: WrapperWithQuery("q", "test") });
    expect(await screen.findByText(/found 3 results/i)).toBeInTheDocument();
    expect(screen.getByTestId("FilterTabs")).toBeInTheDocument();
    expect(screen.getByTestId("next-btn")).toBeInTheDocument();
    const mediaCards = screen.getAllByTestId("MediaCard");
    expect(mediaCards).toHaveLength(mockResults.length);
  });

  it("does not render Pagination if total_pages is less than 2", async () => {
    (apiClient.get as Mock).mockResolvedValue({
      data: {
        ...mockApiResponse,
        total_pages: 1,
      },
    });
    render(<SearchResults />, { wrapper: WrapperWithQuery("q", "test") });
    expect(await screen.findByText(/found 3 results/i)).toBeInTheDocument();
    expect(screen.queryByTestId("next-btn")).not.toBeInTheDocument();
  });

  it("calls setSearchParams with next page when Next is clicked", async () => {
    render(<SearchResults />, { wrapper: WrapperWithQuery("q", "test") });
    expect(await screen.findByText(/found 3 results/i)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("next-btn"));

    expect(setSearchParams).toHaveBeenCalledWith({ q: "test", page: "2" });
  });
});

import * as ReactRouter from "react-router-dom";

const setSearchParams = vi.fn();
vi.spyOn(ReactRouter, "useSearchParams").mockImplementation(() => {
  return [new URLSearchParams({ q: "test", page: "1" }), setSearchParams];
});
