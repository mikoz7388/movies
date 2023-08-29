import { translateCarousel } from "@/lib/utils";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PersonCarouselItem } from "./personCarouselItem";
import { useState } from "react";
import { MovieDetailsWithCredits } from "@/types";

export function PersonCarousel({
  carouselRef,
  cast,
}: {
  carouselRef: React.RefObject<HTMLDivElement>;
  cast: MovieDetailsWithCredits["credits"]["cast"];
}) {
  const [translateValue, setTranslateValue] = useState(0);

  return (
    <div className="relative mx-auto my-8 max-w-[1200px]">
      <Button
        disabled={translateValue === 0}
        variant="outline"
        onClick={() =>
          translateCarousel(
            "left",
            carouselRef,
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
        onClick={() =>
          translateCarousel(
            "right",
            carouselRef,
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
