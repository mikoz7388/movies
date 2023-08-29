import { useLoaderData } from "react-router-dom";
import { useRef } from "react";

import { MovieDetailsWithCredits, MovieList } from "@/types";
import { apiClient, getIMG } from "@/lib/api";
import { Container } from "./ui/container";
import { PersonCarousel } from "./PersonCarousel";
import { Carousel } from "./Carousel";
import { useQuery } from "@tanstack/react-query";
import { useWindowWidth } from "@/hooks/useWindowWidth";

function MoviePage() {
  const movie = useLoaderData() as MovieDetailsWithCredits;
  console.log(movie);

  const { data: similarMovies } = useQuery(
    ["similarMovies", movie.id],
    async () => {
      const response = await apiClient.get(`/movie/${movie.id}/similar`);
      return response.data as MovieList;
    }
  );
  const { itemsPerPage } = useWindowWidth(300, 5);

  const carousel = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="flex gap-8 p-8">
        <div className="shrink-0">
          <img
            className="w-[300px]"
            src={getIMG(movie.poster_path, { type: "poster", size: "w500" })}
            alt={`${movie.title} poster`}
          />
        </div>
        <div>
          <h1 className="bold text-3xl">{movie.title}</h1>
          <p>{movie.overview}</p>
          <p>Budget: {movie.budget}$</p>
          <p>Total revenue: {movie.revenue}$</p>
          <p>Runtime: {movie.runtime} minutes</p>
          <ul>
            Genres:{" "}
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <Container>
        <h2 className="bold mb-8 text-4xl">Top cast</h2>

        {movie.credits.cast.length > 0 ? (
          <PersonCarousel cast={movie.credits.cast} carouselRef={carousel} />
        ) : null}
        <h2 className="bold text-4xl">More like this</h2>

        {similarMovies?.results && (
          <Carousel list={similarMovies.results} itemsPerPage={itemsPerPage} />
        )}
        {/* {movie.videos.results.length > 0 ? (
          <div>
            <h2 className="bold text-2xl">Videos</h2>
            <div className="flex max-w-[1280px] gap-4 overflow-x-scroll">
              {movie.videos.results.map((video) => (
                <div key={video.id}>
                  <iframe
                    className="h-[200px] w-[400px]"
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name}
                  ></iframe>
                  <p>{video.name}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null} */}

        {/* <Carousel movies={movie.credits.cast} imagesPerPage={5} /> */}
        <div className="w-33 h-96">dd</div>
      </Container>
    </>
  );
}

export default MoviePage;
