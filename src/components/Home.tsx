import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/api";
import { MovieList } from "@/types";
import { Hero } from "@/components/Hero";
import { Carousel } from "./Carousel";
import { useWindowWidth } from "@/hooks/useWindowWidth";

export function Home() {
  const { data } = useQuery(["movies"], async () => {
    const response = await apiClient.get("/trending/movie/day");
    return response.data as MovieList;
  });
  const { itemsPerPage } = useWindowWidth(300, 5);
  return data ? (
    <>
      <Hero movie={data.results[0]} />
      <h2>Trending today</h2>
      <Carousel list={data.results} itemsPerPage={itemsPerPage} />
      <Carousel list={data.results} itemsPerPage={itemsPerPage} />
    </>
  ) : null;
}
