import { MovieCreditsCast } from "@/types";
import { Link } from "react-router-dom";

export function KnownFor({ list }: { list: MovieCreditsCast[] }) {
  const movies = list.slice(0, 4);
  return (
    <section className="container mx-auto mt-8 max-w-6xl">
      <h2 className="text-2xl font-semibold">Known For</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movies/${movie.id}`}
            className="flex max-w-lg gap-4"
          >
            <img
              src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
              alt=""
              className="h-48 w-32"
            />
            <div>
              <h3 className="text-xl font-semibold">{movie.title}</h3>
              <p>{movie.character}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
