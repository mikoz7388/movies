import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { apiClient, getIMG } from "@/lib/api";
import { MovieImages, MovieListResult } from "@/types";
import { LoadingSpinner } from "@/components/ui/loading-spiner";

export function Hero({ movie }: { movie: MovieListResult }) {
  const { data } = useQuery(["movies", `${movie.id}`], async () => {
    const response = await apiClient.get(
      `/movie/${movie.id}/images?include_image_language=null`
    );
    return response.data as MovieImages;
  });

  const backgroundImgUrl =
    data &&
    getIMG(data.backdrops[0].file_path, { type: "backdrop", size: "w1280" });

  return (
    <>
      <section className="w-screen bg-muted-foreground py-2  md:py-8">
        <Link to={`/movies/${movie.id}`}>
          <div className="relative mx-auto min-h-[400px] max-w-[1400px]">
            {backgroundImgUrl && (
              <div
                className="absolute inset-0 h-full w-full overflow-hidden bg-cover bg-center bg-no-repeat xl:rounded-3xl "
                style={{
                  backgroundImage: `url(${backgroundImgUrl})`,
                }}
              ></div>
            )}

            <div className="absolute inset-0 h-full w-full bg-black opacity-70 xl:rounded-3xl"></div>

            <div className="container relative z-10 mx-auto px-4 py-16 text-center text-white">
              <h1 className="mb-4 text-4xl font-bold md:text-6xl">
                {movie.title}
              </h1>
              {!backgroundImgUrl && <LoadingSpinner />}
            </div>
          </div>
        </Link>
        <div className="container mt-4">
          <p className="mb-6 text-lg text-popover md:text-xl">
            {movie.overview}{" "}
            {
              <Link
                className="font-semibold hover:text-red-500"
                to={`/movies/${movie.id}`}
              >
                Read more...
              </Link>
            }
          </p>
        </div>
      </section>
    </>
  );
}
