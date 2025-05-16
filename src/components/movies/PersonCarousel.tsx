import { RefObject, useRef } from "react";
import { PersonCarouselItem } from "./PersonCarouselItem";
import { MovieDetailsWithCredits } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type PersonCarouselProps = {
  carouselRef: RefObject<HTMLDivElement>;
  cast: MovieDetailsWithCredits["credits"]["cast"];
};

export function PersonCarousel({ carouselRef, cast }: PersonCarouselProps) {
  const scrollBy = 185 + 16;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollBy : scrollBy,
        behavior: "smooth",
      });
    }
  };

  const startAutoScroll = (direction: "left" | "right") => {
    handleScroll(direction);
    intervalRef.current = setInterval(() => handleScroll(direction), 300);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div className="relative mx-auto h-full max-w-screen-xl">
      <Button
        type="button"
        variant="outline"
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 transition-transform active:scale-95"
        onClick={() => handleScroll("left")}
        onMouseDown={() => startAutoScroll("left")}
        onMouseUp={stopAutoScroll}
        onMouseLeave={stopAutoScroll}
        onTouchStart={() => startAutoScroll("left")}
        onTouchEnd={stopAutoScroll}
        aria-label="Scroll left"
      >
        <ChevronLeft />
      </Button>
      <div
        ref={carouselRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-8"
        style={{ scrollPaddingLeft: 16, scrollPaddingRight: 16 }}
      >
        {cast.map((person) => (
          <div key={person.id} className="snap-start">
            <PersonCarouselItem cast={person} />
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 transition-transform active:scale-95"
        onClick={() => handleScroll("right")}
        onMouseDown={() => startAutoScroll("right")}
        onMouseUp={stopAutoScroll}
        onMouseLeave={stopAutoScroll}
        onTouchStart={() => startAutoScroll("right")}
        onTouchEnd={stopAutoScroll}
        aria-label="Scroll right"
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
