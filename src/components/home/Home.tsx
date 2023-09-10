import { Hero } from "@/components/home/Hero";
import { MovieCarousel } from "@/components/shared/MovieCarousel";
import { useLoaderData } from "react-router-dom";

import { HomeLoader } from "@/main";
import { type LoaderData } from "@/lib/utils";

export function Home() {
  const data = useLoaderData() as LoaderData<typeof HomeLoader>;

  return (
    <>
      <Hero movie={data.results[0]} />
      <section className="">
        <h2 className="bold my-8 text-4xl">Trending today</h2>
        <MovieCarousel list={data.results} />
      </section>
      <div className="h-96"></div>
    </>
  );
}
