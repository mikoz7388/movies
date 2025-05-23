import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./global.css";

import App from "@/App.tsx";
import MoviePage from "@/components/movies/MoviePage";
import { ThemeProvider } from "@/components/shared/theme-provider";
import NotFoundPage from "./components/NotFoundPage";
import { PersonPage } from "./components/person/PersonPage";
import { Home } from "@/components/home/Home";
import { HomeLoader, MovieLoader, PersonLoader } from "@/loaders";
import { SearchResults } from "./components/search/SearchResults";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: HomeLoader,
      },
      {
        path: "/movies/:id",
        element: <MoviePage />,
        loader: MovieLoader,
      },
      {
        path: "/person/:id",
        element: <PersonPage />,
        loader: PersonLoader,
      },
      {
        path: "/search/",
        element: <SearchResults />,
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
