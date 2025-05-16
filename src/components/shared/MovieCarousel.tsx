import { MovieListResult } from "@/types";
import { useState, useEffect, useCallback } from "react";
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

  const maxPage = Math.max(1, Math.ceil(list.length / itemsPerPage));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  const placeholdersCount = itemsPerPage - currentItems.length;

  const paginate = useCallback(
    (pageNumber: number) => {
      setCurrentPage(Math.max(1, Math.min(pageNumber, maxPage)));
    },
    [maxPage]
  );

  useEffect(() => {
    if (currentPage > maxPage) setCurrentPage(maxPage);
  }, [itemsPerPage, currentPage, maxPage]);

  return (
    <div
      ref={containerRef}
      className="mx-auto flex flex-row items-center justify-between gap-4"
    >
      <Button
        variant="outline"
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous movies"
        className="transition-transform active:scale-95"
      >
        <ArrowLeft />
      </Button>
      {currentItems.map((movie) => (
        <MovieCarouselItem key={movie.id} movie={movie} />
      ))}
      {/* Render placeholders to keep layout consistent */}
      {Array.from({ length: placeholdersCount }).map((_, idx) => (
        <div
          key={`placeholder-${idx}`}
          style={{ width: MovieCarouselItemWidth, height: "100%" }}
          className="invisible"
        />
      ))}
      <Button
        variant="outline"
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === maxPage}
        aria-label="Next movies"
        className="transition-transform active:scale-95"
      >
        <ArrowRight />
      </Button>
    </div>
  );
}
