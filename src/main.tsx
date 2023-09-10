// import "./wdyr.ts";

import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./global.css";

import App from "@/App.tsx";
import MoviePage from "@/components/movies/MoviePage";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { apiClient } from "@/lib/api.ts";
import NotFoundPage from "./components/NotFoundPage";
import { PersonPage } from "./components/person/PersonPage";

import { LoaderFunction } from "react-router-dom";
import { MovieList } from "./types";

const queryClient = new QueryClient();

export const HomeLoader = (async () => {
  const response = await apiClient.get("/trending/movie/day");
  return response.data as MovieList;
}) satisfies LoaderFunction;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    loader: HomeLoader,
    children: [
      {
        path: "/movies/:id",
        element: <MoviePage />,
        loader: async ({ params }) =>
          apiClient
            .get(
              `/movie/${params.id}?api_key=API_KEY&append_to_response=videos,credits,images`
            )
            .then((res) => res.data),
      },
      {
        path: "/person/:id",
        element: <PersonPage />,

        loader: async ({ params }) =>
          apiClient
            .get(
              `/person/${params.id}?api_key=API_KEY&append_to_response=movie_credits`
            )
            .then((res) => res.data),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
