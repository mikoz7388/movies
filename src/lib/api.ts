import axios from "axios";
import { base, imgBase } from "./constants";
import { ImgType } from "@/types";

export const apiClient = axios.create({
  baseURL: base,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_READ_TOKEN}`,
  },
});

export function getIMG(path: string, imgType: ImgType) {
  const url = `${imgBase}/${imgType.size}/${path}`;
  return url;
}
