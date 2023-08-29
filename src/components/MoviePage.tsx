import { useLoaderData } from "react-router-dom";
import { useRef, useState } from "react";

import { MovieDetailsWithCredits } from "@/types";
import { getIMG } from "@/lib/api";
import { Container } from "./ui/container";
import { Button } from "./ui/button";
import { PersonCarouselItem } from "./personCarouselItem";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TRANSISION_VALUE = 300;
const IMG_WIDTH = 185;

function MoviePage() {
  const movie = useLoaderData() as MovieDetailsWithCredits;

  const carousel = useRef<HTMLDivElement>(null);

  const [translateValue, setTranslateValue] = useState(0);

  function translateCarousel(direction: "left" | "right") {
    if (direction === "left") {
      const newValue = translateValue + TRANSISION_VALUE;
      if (newValue > 0) {
        setTranslateValue(0);
        return;
      }

      carousel.current!.style.transform = `translateX(${newValue}px)`;
      setTranslateValue(newValue);
      // console.log(translateValue);
      return;
    }
    if (direction === "right") {
      const newValue = translateValue - TRANSISION_VALUE;
      if (newValue < -carousel.current!.clientWidth) {
        setTranslateValue(-carousel.current!.clientWidth);
        return;
      }

      carousel.current!.style.transform = `translateX(${newValue}px)`;
      setTranslateValue(newValue);

      return;
    }
  }

  return (
    <>
      <div className="flex gap-8 p-8">
        <div className="shrink-0">
          <img
            className="w-[300px]"
            src={getIMG(movie.poster_path, { type: "poster", size: "w500" })}
            alt={`${movie.title} poster`}
          />
        </div>
        <div>
          <h1 className="bold text-3xl">{movie.title}</h1>
          <p>{movie.overview}</p>
          <p>Budget: {movie.budget}$</p>
          <p>Total revenue: {movie.revenue}$</p>
          <p>Runtime: {movie.runtime} minutes</p>
          <ul>
            Genres:{" "}
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <Container>
        {movie.credits.cast.length > 0 ? (
          <div className="relative mx-auto max-w-[1200px]">
            <h2 className="bold text-2xl">Cast</h2>
            <Button
              disabled={translateValue === 0}
              variant="outline"
              onClick={() => translateCarousel("left")}
              className="absolute left-0 top-2/4 z-10 aspect-square h-14 translate-x-[-50%] translate-y-[-50%] rounded-full"
            >
              <ChevronLeft />
            </Button>
            <div className=" flex  gap-4 overflow-x-clip">
              <div className="flex gap-4 transition-transform " ref={carousel}>
                {movie.credits.cast.map((cast) => (
                  <PersonCarouselItem key={cast.id} cast={cast} />
                ))}
              </div>
            </div>
            <Button
              className="absolute right-0 top-2/4 z-10 aspect-square h-14 translate-x-[50%] translate-y-[-50%] rounded-full"
              variant="outline"
              onClick={() => translateCarousel("right")}
            >
              <ChevronRight />
            </Button>
          </div>
        ) : null}
        {/* {movie.videos.results.length > 0 ? (
          <div>
            <h2 className="bold text-2xl">Videos</h2>
            <div className="flex max-w-[1280px] gap-4 overflow-x-scroll">
              {movie.videos.results.map((video) => (
                <div key={video.id}>
                  <iframe
                    className="h-[200px] w-[400px]"
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name}
                  ></iframe>
                  <p>{video.name}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null} */}

        {/* <Carousel movies={movie.credits.cast} imagesPerPage={5} /> */}
        <div className="w-33 h-96">dd</div>
      </Container>
    </>
  );
}

export default MoviePage;
