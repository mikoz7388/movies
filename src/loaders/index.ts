import { apiClient } from "@/lib/api";
import type { LoaderFunction } from "react-router-dom";
import type { MovieList } from "@/types";

export const HomeLoader: LoaderFunction = async () => {
  try {
    const response = await apiClient.get("/trending/movie/day");
    return response.data as MovieList;
  } catch {
    throw new Response("Failed to load trending movies", { status: 500 });
  }
};

export const MovieLoader: LoaderFunction = async ({ params }) => {
  try {
    const response = await apiClient.get(
      `/movie/${params?.id}?append_to_response=videos,credits,images`
    );
    return response.data;
  } catch {
    throw new Response("Failed to load movie details", { status: 500 });
  }
};

export const PersonLoader: LoaderFunction = async ({ params }) => {
  try {
    const response = await apiClient.get(
      `/person/${params?.id}?append_to_response=movie_credits`
    );
    return response.data;
  } catch {
    throw new Response("Failed to load person details", { status: 500 });
  }
};

export const SearchLoader: LoaderFunction = async ({ params }) => {
  try {
    const response = await apiClient.get(
      `/search/multi?query=${params?.query}`
    );
    return response.data;
  } catch {
    throw new Response("Failed to load search results", { status: 500 });
  }
};