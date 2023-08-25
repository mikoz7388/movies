import axios from "axios";

export const base = "https://api.themoviedb.org/3";

export const apiClient = axios.create({
  baseURL: base,
  headers: {
    Accept: "application/json",
    Authorization: import.meta.env.VITE_TMDB_API_KEY,
  },
});

export function getURL(endpoint: string, params?: Record<string, string>) {
  const q = new URLSearchParams(params);
  const url = `${base}/${endpoint}?${q}`;

  return url;
}
