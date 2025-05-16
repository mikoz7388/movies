import { Hero } from "@/components/home/Hero";
import { MovieCarousel } from "@/components/shared/MovieCarousel";
import { useLoaderData } from "react-router-dom";
import type { MovieList } from "@/types";

export function Home() {
  const data = useLoaderData() as MovieList;

  if (!data?.results || data.results.length === 0) {
    return <div>No trending movies found.</div>;
  }

  return (
    <>
      <Hero movie={data.results[0]} />
      <section aria-labelledby="trending-heading" className="container">
        <h2 id="trending-heading" className="py-16 text-4xl font-bold">
          Trending today
        </h2>
        <MovieCarousel list={data.results} />
      </section>
      <div className="h-96" aria-hidden="true"></div>
    </>
  );
}
