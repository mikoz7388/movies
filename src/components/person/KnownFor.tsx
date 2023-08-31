import { MovieCreditsCast } from "@/types";

export function KnownFor({ list }: { list: MovieCreditsCast[] }) {
  const movies = list.slice(0, 4);
  return (
    <section className="mx-auto mt-8">
      <h2 className="text-2xl font-semibold">Known For</h2>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="flex gap-4">
            <img
              src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
              alt=""
              className="h-48 w-32"
            />
            <div>
              <h3 className="text-xl font-semibold">{movie.title}</h3>
              <p>{movie.character}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
