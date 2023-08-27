import { useQuery } from "@tanstack/react-query";
import { apiClient, getIMG } from "../lib/api";
import { MovieImages, MovieListResult } from "../types";
import { Link } from "react-router-dom";

export function Hero({ movie }: { movie: MovieListResult }) {
  const { data } = useQuery(["movies", `${movie.id}`], async () => {
    const response = await apiClient.get(
      `/movie/${movie.id}/images?include_image_language=null`
    );
    return response.data as MovieImages;
  });
  return (
    <>
      <Link to={`/movies/${movie.id}`}>
        <h2 className="mb-4 text-4xl font-bold hover:underline">
          {movie.title}
        </h2>
        {data ? (
          <img
            className="w-full object-cover"
            src={getIMG(data.backdrops[0].file_path, {
              type: "backdrop",
              size: "w1280",
            })}
            alt={movie.title}
          />
        ) : null}
      </Link>
    </>
  );
}
