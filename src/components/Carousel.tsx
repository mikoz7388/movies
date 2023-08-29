import { MovieListResult } from "@/types";
import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MovieCarouselItem } from "./movieCarouselItem";

interface CarouselProps {
  list: MovieListResult[];
  itemsPerPage: number;
}

export function Carousel({ list, itemsPerPage }: CarouselProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItem = list.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mb-24 flex min-h-[500px] w-full flex-col items-center">
      <div className="flex w-full place-items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ArrowLeft />
        </Button>
        {currentItem.map((movie) => (
          <MovieCarouselItem key={movie.id} movie={movie} />
        ))}
        <Button
          variant="outline"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(list.length / itemsPerPage)}
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
