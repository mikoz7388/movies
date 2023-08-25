import { useQuery } from "@tanstack/react-query";
import { apiClient, getIMG as getBackdrop } from "./lib/api";
import { MovieImages, MovieListResult } from "./types";
import { Link } from "react-router-dom";

export function Hero({ movie }: { movie: MovieListResult }) {
  const { data } = useQuery(["movies", `${movie.id}`], async () => {
    const response = await apiClient.get(
      `/movie/${movie.id}/images?include_image_language=null`
    );
    return response.data as MovieImages;
  });
  // console.log("to", { data });
  return (
    <>
      <Link to={`/movie/${movie.id}`}>
        <h1 className="text-4xl font-bold">{movie.title}</h1>
        {data ? (
          <img
            className="w-full h-96 object-cover"
            src={getBackdrop(data.backdrops[0].file_path, "w1280")}
            alt={movie.title}
          />
        ) : null}
      </Link>
    </>
  );
}
