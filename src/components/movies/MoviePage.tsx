import { useLoaderData } from "react-router-dom";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";

import { MovieDetailsWithCredits, MovieList } from "@/types";
import { apiClient, getIMG } from "@/lib/api";
import { Container } from "@/components/ui/container";
import { PersonCarousel } from "@/components/movies/PersonCarousel";
import { MovieCarousel } from "@/components/shared/MovieCarousel";
import { MovieDetails } from "./MovieDetails";

function MoviePage() {
  const movie = useLoaderData() as MovieDetailsWithCredits;
  const carousel = useRef<HTMLDivElement>(null);

  const { data: similarMovies, isLoading: isSimilarLoading } =
    useQuery<MovieList>(["similarMovies", movie.id], async () => {
      const response = await apiClient.get(`/movie/${movie.id}/similar`);
      return response.data as MovieList;
    });

  return (
    <>
      <header className="container my-8">
        <h1 className="mb-2 text-4xl font-bold text-foreground">
          {movie.title}
          {movie.release_date && (
            <span className="ml-2 text-2xl font-normal text-muted-foreground">
              ({movie.release_date.slice(0, 4)})
            </span>
          )}
        </h1>
      </header>
      <div className="container flex flex-col gap-8 md:flex-row md:justify-between">
        <div className="m-4 w-full shrink-0 md:w-1/2">
          <div className="relative h-80 w-full md:h-[32rem]">
            <img
              className="size-full rounded-xl object-cover shadow-lg"
              src={getIMG(movie.backdrop_path, {
                type: "backdrop",
                size: "w780",
              })}
              alt={`${movie.title} poster`}
            />
          </div>
        </div>
        <MovieDetails movie={movie} />
      </div>
      <Container>
        <h2 className="mb-4 mt-12 text-3xl font-bold text-foreground">
          Top cast
        </h2>
        {movie.credits.cast.length > 0 && (
          <PersonCarousel cast={movie.credits.cast} carouselRef={carousel} />
        )}

        <h2 className="mb-4 mt-12 text-3xl font-bold text-foreground">
          More like this
        </h2>
        {isSimilarLoading && <div>Loading similar movies...</div>}
        {similarMovies?.results && similarMovies.results.length > 0 ? (
          <MovieCarousel list={similarMovies.results} />
        ) : (
          !isSimilarLoading && <div>No similar movies found.</div>
        )}

        <div className="h-96" aria-hidden="true"></div>
      </Container>
    </>
  );
}

export default MoviePage;
