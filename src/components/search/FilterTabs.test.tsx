import { render, screen, fireEvent } from "@testing-library/react";
import FilterTabs from "./FilterTabs";
import { describe, expect, it, vi } from "vitest";

describe("FilterTabs", () => {
  const counts = { all: 20, movie: 10, tv: 7, person: 3 };
  const onFilterChange = vi.fn();

  it("renders all filter tabs with correct labels and counts", () => {
    render(
      <FilterTabs
        activeFilter="all"
        onFilterChange={onFilterChange}
        counts={counts}
      />
    );

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Movies")).toBeInTheDocument();
    expect(screen.getByText("TV Shows")).toBeInTheDocument();
    expect(screen.getByText("People")).toBeInTheDocument();

    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("highlights the active tab", () => {
    render(
      <FilterTabs
        activeFilter="movie"
        onFilterChange={onFilterChange}
        counts={counts}
      />
    );
    const movieTab = screen.getByRole("button", { name: /movies/i });
    expect(movieTab).toHaveClass("bg-yellow-500");
  });

  it("calls onFilterChange with correct value when a tab is clicked", () => {
    render(
      <FilterTabs
        activeFilter="all"
        onFilterChange={onFilterChange}
        counts={counts}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /tv shows/i }));
    expect(onFilterChange).toHaveBeenCalledWith("tv");
  });
});
