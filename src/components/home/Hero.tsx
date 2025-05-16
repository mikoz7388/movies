import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { apiClient, getIMG } from "@/lib/api";
import { MovieImages, MovieListResult } from "@/types";
import { LoadingSpinner } from "@/components/ui/loading-spiner";

type HeroProps = {
  movie: MovieListResult;
};

export function Hero({ movie }: HeroProps) {
  const { data, isLoading } = useQuery<MovieImages>(
    ["movie-images", movie.id],
    async () => {
      const response = await apiClient.get(
        `/movie/${movie.id}/images?include_image_language=null`
      );
      return response.data as MovieImages;
    }
  );

  const backgroundImgUrl = data?.backdrops?.[0]?.file_path
    ? getIMG(data.backdrops[0].file_path, { type: "backdrop", size: "w1280" })
    : undefined;

  return (
    <section className="bg-muted-foreground">
      <Link to={`/movies/${movie.id}`}>
        <div className="relative mx-auto min-h-[400px] max-w-[1280x]">
          {backgroundImgUrl && (
            <div
              className="absolute inset-0 size-full overflow-hidden bg-cover bg-center bg-no-repeat "
              style={{ backgroundImage: `url(${backgroundImgUrl})` }}
            />
          )}
          <div className="absolute inset-0 size-full bg-black opacity-70 "></div>
          <div className="container relative z-10 mx-auto px-4 py-16 text-center text-white">
            <h1 className="text-4xl font-bold md:text-6xl">{movie.title}</h1>
            {isLoading && <LoadingSpinner />}
          </div>
        </div>
      </Link>
      <div className="container py-8">
        <p className=" line-clamp-3 text-lg text-popover md:text-xl">
          {movie.overview}
        </p>
        <Link
          className="text-lg font-semibold text-popover hover:text-red-500"
          to={`/movies/${movie.id}`}
        >
          Read more...
        </Link>
      </div>
    </section>
  );
}
