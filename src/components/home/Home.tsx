import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/api";
import { MovieList } from "@/types";
import { Hero } from "@/components/home/Hero";
import { MovieCarousel } from "@/components/shared/MovieCarousel";

export function Home() {
  const { data } = useQuery(["movies"], async () => {
    const response = await apiClient.get("/trending/movie/day");
    return response.data as MovieList;
  });

  return data ? (
    <>
      <Hero movie={data.results[0]} />
      <section className="">
        <h2 className="bold my-8 text-4xl">Trending today</h2>
        <MovieCarousel list={data.results} />
      </section>
      <div className="h-96"></div>
    </>
  ) : null;
}
