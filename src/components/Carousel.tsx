import { getIMG } from "@/lib/api";
import { MovieListResult } from "@/types";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "./ui/button";
import clsx from "clsx";

interface CarouselProps {
  movies: MovieListResult[];
  imagesPerPage?: number;
}

export function Carousel({ movies, imagesPerPage = 4 }: CarouselProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for images on the current page
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = movies.slice(indexOfFirstImage, indexOfLastImage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-4">
        {movies.map((_, index) => {
          const active =
            index / imagesPerPage + 1 === currentPage
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500";
          return (
            index % imagesPerPage === 0 && (
              <Button
                key={index}
                variant={"outline"}
                onClick={() => paginate(index / imagesPerPage + 1)}
                className={clsx(active, "rounded-full hover:bg-blue-500")}
              >
                {index / imagesPerPage + 1}
              </Button>
            )
          );
        })}
      </div>
      <div className="flex h-[500px] gap-4">
        {currentImages.map((movie) => (
          <div key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <img
                className="w-[300px] object-cover"
                src={getIMG(movie.poster_path, {
                  type: "poster",
                  size: "w500",
                })}
                alt={`${movie.title} poster`}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
