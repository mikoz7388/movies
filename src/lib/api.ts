import { MovieList } from "@/types";

export const base = "https://api.movies.tastejs.com";
export const media_base = "https://image.tmdb.org/t/p";

export function getURL(endpoint: string, params?: Record<string, string>) {
  const q = new URLSearchParams(params);
  const url = `${base}/${endpoint}?${q}`;

  return url;
}

export async function getMovies() {
  const response = await fetch(getURL("trending/movie/day"));
  const data = await response.json();

  return data as MovieList;
}
