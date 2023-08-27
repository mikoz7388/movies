import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./global.css";

import App from "@/App.tsx";
import MoviePage from "@/components/MoviePage";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { apiClient } from "@/lib/api.ts";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404</div>,

    children: [
      {
        path: "/movies/:id",
        element: <MoviePage />,
        loader: async ({ params }) =>
          // apiClient
          //   .get(
          //     `https://api.themoviedb.org/3/movie/157336?api_key=API_KEY&append_to_response=videos,images`
          //   )
          //   .then((res) => res.data),
          apiClient
            .get(
              `/movie/${params.id}?api_key=API_KEY&append_to_response=videos,images`
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
