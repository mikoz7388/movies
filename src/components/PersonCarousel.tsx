import { translateCarousel } from "@/lib/utils";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PersonCarouselItem } from "./personCarouselItem";
import { useState, useRef } from "react";
import { MovieDetailsWithCredits } from "@/types";

export function PersonCarousel({
  carouselRef,
  cast,
}: {
  carouselRef: React.RefObject<HTMLDivElement>;
  cast: MovieDetailsWithCredits["credits"]["cast"];
}) {
  const [translateValue, setTranslateValue] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  let buttonDisabled: number;
  if (containerRef.current && carouselRef.current) {
    buttonDisabled =
      containerRef.current.offsetWidth - carouselRef.current.offsetWidth;
  } else {
    buttonDisabled = 213769420;
  }
  return (
    <div className="relative mx-auto my-8 max-w-[1200px]" ref={containerRef}>
      <Button
        disabled={translateValue === 0}
        variant="outline"
        onClick={() =>
          translateCarousel(
            "left",
            carouselRef,
            containerRef,
            translateValue,
            setTranslateValue
          )
        }
        className="absolute left-0 top-2/4 z-10 aspect-square h-14 translate-x-[-50%] translate-y-[-50%] rounded-full"
      >
        <ChevronLeft />
      </Button>
      <div className=" flex  gap-4 overflow-x-clip">
        <div className="flex gap-4 transition-transform " ref={carouselRef}>
          {cast.map((cast) => (
            <PersonCarouselItem key={cast.id} cast={cast} />
          ))}
        </div>
      </div>
      <Button
        className="absolute right-0 top-2/4 z-10 aspect-square h-14 translate-x-[50%] translate-y-[-50%] rounded-full"
        variant="outline"
        disabled={translateValue === buttonDisabled}
        onClick={() =>
          translateCarousel(
            "right",
            carouselRef,
            containerRef,
            translateValue,
            setTranslateValue
          )
        }
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
