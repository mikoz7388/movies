import { useLoaderData } from "react-router-dom";

import { MovieDetails } from "@/types";
import { getIMG } from "@/lib/api";
import { Container } from "./ui/container";

function MoviePage() {
  const movie = useLoaderData() as MovieDetails;

  return (
    <>
      <div className="flex gap-8 p-8">
        <div className="shrink-0">
          <img
            className="w-[300px]"
            src={getIMG(movie.poster_path, "w300")}
            alt={`${movie.title} poster`}
          />
        </div>
        <div>
          <h1 className="bold text-3xl">{movie.title}</h1>
          <p>{movie.overview}</p>
          <p>Budget: {movie.budget}$</p>
          <p>Total revenue: {movie.revenue}$</p>
          <p>Runtime: {movie.runtime} minutes</p>
        </div>
      </div>
      <Container>
        {movie.videos.results.length > 0 ? (
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
        ) : null}
      </Container>
      {/* <Container>{movie ? JSON.stringify(movie, null, 2) : null}</Container> */}
    </>
  );
}

export default MoviePage;
