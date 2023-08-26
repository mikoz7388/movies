import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/api";
import { MovieList } from "@/types";
import { Hero } from "@/components/Hero";

export function Home() {
  const { data } = useQuery(["movies"], async () => {
    const response = await apiClient.get("/trending/movie/day");
    return response.data as MovieList;
  });

  return data ? (
    <>
      <Hero movie={data.results[0]} />
    </>
  ) : null;
}
