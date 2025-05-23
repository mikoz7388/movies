import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";
import { describe, it, expect, vi } from "vitest";

describe("Pagination", () => {
  it("renders current and total pages", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onNextPage={() => {}}
        onPrevPage={() => {}}
      />
    );

    const pageInfo = screen.getByText("2").parentElement;
    expect(pageInfo).toBeInTheDocument();
    expect(pageInfo).toHaveTextContent("2/5");
    const spans = pageInfo?.querySelectorAll("span");
    expect(spans?.[0]).toHaveTextContent("2");
    expect(spans?.[1]).toHaveTextContent("/");
    expect(spans?.[2]).toHaveTextContent("5");
  });

  it("calls onNextPage when Next is clicked", () => {
    const onNextPage = vi.fn();
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onNextPage={onNextPage}
        onPrevPage={() => {}}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(onNextPage).toHaveBeenCalled();
  });

  it("calls onPrevPage when Previous is clicked", () => {
    const onPrevPage = vi.fn();
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onNextPage={() => {}}
        onPrevPage={onPrevPage}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /previous/i }));
    expect(onPrevPage).toHaveBeenCalled();
  });

  it("disables Previous button on first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onNextPage={() => {}}
        onPrevPage={() => {}}
      />
    );
    expect(screen.getByRole("button", { name: /previous/i })).toBeDisabled();
  });

  it("disables Next button on last page", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onNextPage={() => {}}
        onPrevPage={() => {}}
      />
    );
    expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
  });
});
