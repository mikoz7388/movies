import { imgType } from "@/types";
import axios from "axios";

const base = "https://api.themoviedb.org/3";
const imgBase = "https://image.tmdb.org/t/p";

export const apiClient = axios.create({
  baseURL: base,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_READ_TOKEN}`,
  },
});

export function getIMG(path: string, imgType: imgType) {
  const url = `${imgBase}/${imgType.size}/${path}`;
  return url;
}

export function getURL(endpoint: string, params?: Record<string, string>) {
  const q = new URLSearchParams(params);
  const url = `${base}/${endpoint}?${q}`;

  return url;
}
