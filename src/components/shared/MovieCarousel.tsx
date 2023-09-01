import { MovieListResult } from "@/types";
import { useState, useEffect } from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MovieCarouselItem } from "@/components/shared/MovieCarouselItem";

import { useElementSize } from "@/hooks/useElementSize";
import { useNumberOfItemsPerView } from "@/hooks/useNumberOfItemsPerView";

import { MovieCarouselGap, MovieCarouselItemWidth } from "@/lib/constants";

interface CarouselProps {
  list: MovieListResult[];
}

export function MovieCarousel({ list }: CarouselProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const [containerRef, { width: containerWidth }] = useElementSize();

  const itemsPerPage = useNumberOfItemsPerView({
    containerWidth,
    itemWidth: MovieCarouselItemWidth,
    gap: MovieCarouselGap,
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItem = list.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const maxPage = Math.ceil(list.length / itemsPerPage);
    if (currentPage > maxPage) setCurrentPage(maxPage);
  }, [itemsPerPage, currentPage, list.length]);

  return (
    <div
      ref={containerRef}
      className="mx-auto flex max-w-[1280px]  flex-row items-center justify-between gap-4"
    >
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
  );
}
