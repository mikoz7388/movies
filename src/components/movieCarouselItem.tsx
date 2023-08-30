import { getIMG } from "@/lib/api";
import { MovieListResult } from "@/types";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

export function MovieCarouselItem({ movie }: { movie: MovieListResult }) {
  const src = movie.poster_path
    ? getIMG(movie.poster_path, {
        type: "poster",
        size: `w342`,
      })
    : "https://placehold.co/342x513";

  return (
    <div className="h-full w-[200px] grow overflow-hidden rounded bg-muted">
      <Link to={`/movies/${movie.id}`}>
        <div>
          <img
            className="object-cover"
            width={342}
            height={513}
            src={src}
            alt={`${movie.title} poster`}
          />
        </div>
      </Link>
      <div className="p-2">
        <Link to={`/movies/${movie.id}`}>
          <h2 className="whitespace-nowrap text-sm font-bold hover:underline">
            {movie.title}
          </h2>
        </Link>
        <div className="flex items-center">
          <Star className="mr-1 inline-block h-4 w-4" stroke="red" />
          {movie.vote_average.toFixed(1)}
        </div>
      </div>
    </div>
  );
}
