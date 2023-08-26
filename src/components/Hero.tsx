import { useQuery } from "@tanstack/react-query";
import { apiClient, getIMG as getBackdropImg } from "../lib/api";
import { MovieImages, MovieListResult } from "../types";
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
      <Link to={`/movies/${movie.id}`}>
        <h2 className="text-4xl font-bold hover:underline mb-4">
          {movie.title}
        </h2>
        {data ? (
          <img
            className="w-full h-96 object-cover"
            src={getBackdropImg(data.backdrops[0].file_path, "original")}
            alt={movie.title}
          />
        ) : null}
      </Link>
    </>
  );
}
