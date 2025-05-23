import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MediaCard from "./MediaCard";
import type { MultiSearchResult } from "./SearchResults";
import { describe, expect, it } from "vitest";

describe("MediaCard", () => {
  const movie: MultiSearchResult = {
    media_type: "movie",
    id: 1,
    title: "Test Movie",
    poster_path: "/poster.jpg",
    overview: "A test movie.",
    release_date: "2020-01-01",
    vote_average: 8.5,
    vote_count: 100,
    genre_ids: [],
    adult: false,
    backdrop_path: "",
    original_language: "en",
    original_title: "Test Movie",
    popularity: 10,
    video: false,
  };

  const tv: MultiSearchResult = {
    media_type: "tv",
    id: 2,
    name: "Test Show",
    poster_path: "/tv.jpg",
    overview: "A test show.",
    first_air_date: "2021-01-01",
    vote_average: 7.2,
    vote_count: 50,
    genre_ids: [],
    adult: false,
    backdrop_path: "",
    original_language: "en",
    original_name: "Test Show",
    popularity: 5,
    origin_country: [],
  };

  const person: MultiSearchResult = {
    media_type: "person",
    id: 3,
    name: "Test Person",
    profile_path: "/person.jpg",
    known_for_department: "Acting",
    popularity: 20,
    adult: false,
    gender: 1,
    original_name: "Test Person",
    credit_id: "abc123",
    department: "Acting",
    job: "Actor",
  };

  it("renders movie card with correct info and link", () => {
    render(<MediaCard result={movie} />, { wrapper: MemoryRouter });
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("2020")).toBeInTheDocument();
    expect(screen.getByText("A test movie.")).toBeInTheDocument();

    const badge = screen
      .getByText("Test Movie")
      .closest(".group")
      ?.querySelector(".bg-blue-600");
    expect(badge).toHaveTextContent(/movie/i);

    expect(screen.getByRole("link", { name: /view details/i })).toHaveAttribute(
      "href",
      "/movies/1"
    );
  });

  it("renders tv card with correct info and link", () => {
    render(<MediaCard result={tv} />, { wrapper: MemoryRouter });
    expect(screen.getByText("Test Show")).toBeInTheDocument();
    expect(screen.getByText("2021")).toBeInTheDocument();
    expect(screen.getByText("A test show.")).toBeInTheDocument();
    expect(screen.getByText(/tv/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view details/i })).toHaveAttribute(
      "href",
      "/movies/2"
    );
  });

  it("renders person card with correct info and link", () => {
    render(<MediaCard result={person} />, { wrapper: MemoryRouter });
    expect(screen.getByText("Test Person")).toBeInTheDocument();
    expect(screen.getByText("Acting")).toBeInTheDocument();
    const badge = screen
      .getByText("Test Person")
      .closest(".group")
      ?.querySelector(".bg-purple-600");
    expect(badge).toHaveTextContent(/person/i);
    expect(screen.getByRole("link", { name: /view details/i })).toHaveAttribute(
      "href",
      "/person/3"
    );
  });
});
