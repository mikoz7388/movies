import { useLoaderData } from "react-router-dom";
import { useRef } from "react";

import { MovieDetailsWithCredits, MovieList } from "@/types";
import { apiClient, getIMG } from "@/lib/api";
import { Container } from "../ui/container";
import { PersonCarousel } from "@/components/movies/PersonCarousel";
import { MovieCarousel } from "@/components/shared/MovieCarousel";
import { useQuery } from "@tanstack/react-query";
import { MovieDetails } from "./MovieDetails";

function MoviePage() {
  const movie = useLoaderData() as MovieDetailsWithCredits;

  const { data: similarMovies } = useQuery(
    ["similarMovies", movie.id],
    async () => {
      const response = await apiClient.get(`/movie/${movie.id}/similar`);
      return response.data as MovieList;
    }
  );
  console.log(movie);
  const carousel = useRef<HTMLDivElement>(null);

  return (
    <>
      <h1>
        {movie.title}{" "}
        {movie.release_date && <span>({movie.release_date.slice(0, 4)})</span>}
      </h1>
      <div className="container flex justify-between">
        <div className="m-4 w-1/2">
          <img
            className="w-full"
            src={getIMG(movie.backdrop_path, {
              type: "backdrop",
              size: "w780",
            })}
            alt={`${movie.title} poster`}
          />
        </div>
        <MovieDetails movie={movie} />
      </div>
      <Container>
        <h2 className="bold text-4xl">Top cast</h2>

        {movie.credits.cast.length > 0 ? (
          <PersonCarousel cast={movie.credits.cast} carouselRef={carousel} />
        ) : null}
        <h2 className="bold text-4xl">More like this</h2>

        {similarMovies?.results && (
          <MovieCarousel list={similarMovies.results} />
        )}

        <div className="h-96"></div>
      </Container>
    </>
  );
}

export default MoviePage;
