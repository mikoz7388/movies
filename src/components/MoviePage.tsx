import { useLoaderData } from "react-router-dom";

import { MovieDetailsWithCredits } from "@/types";
import { getIMG } from "@/lib/api";
import { Container } from "./ui/container";

function MoviePage() {
  const movie = useLoaderData() as MovieDetailsWithCredits;
  console.log(movie);

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

        {movie.credits.cast.length > 0 ? (
          <div>
            <h2 className="bold text-2xl">Cast</h2>
            <div className="flex max-w-[1280px] gap-4 overflow-x-scroll">
              {movie.credits.cast.map((cast) => {
                const profile_path = cast.profile_path;
                return (
                  <div key={cast.id}>
                    {profile_path ? (
                      <img
                        className="min-w-[185px]"
                        src={getIMG(profile_path, {
                          type: "profile",
                          size: "w185",
                        })}
                        alt={`${cast.name} profile`}
                      />
                    ) : null}
                    <p>{cast.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </Container>
    </>
  );
}

export default MoviePage;
