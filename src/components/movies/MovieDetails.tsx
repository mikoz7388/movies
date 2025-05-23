import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { currencyFormatter } from "@/lib/utils";
import { MovieDetailsWithCredits } from "@/types";

export function MovieDetails({ movie }: { movie: MovieDetailsWithCredits }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="overview">
        <AccordionTrigger>Overview</AccordionTrigger>
        <AccordionContent>
          <p>{movie.overview}</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Info">
        <AccordionTrigger>Info</AccordionTrigger>
        <AccordionContent>
          {
            <>
              <p>
                <span className="font-semibold">Budget:</span>{" "}
                {currencyFormatter.format(movie.budget) || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Revenue:</span>{" "}
                {currencyFormatter.format(movie.revenue) || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Runtime:</span>{" "}
                {movie.runtime || "N/A"} minutes
              </p>
              <p>
                <span className="font-semibold">Genres:</span>{" "}
                {movie.genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </p>
            </>
          }
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="videos">
        <AccordionTrigger>Videos</AccordionTrigger>
        <AccordionContent>
          <div className="flex max-w-full overflow-x-scroll">
            {movie.videos.results.length > 0
              ? movie.videos.results.map((video) => (
                  <div key={video.id}>
                    <iframe
                      width="300"
                      height="200"
                      src={`https://www.youtube.com/embed/${video.key}`}
                      title={video.name}
                      allowFullScreen
                    ></iframe>
                  </div>
                ))
              : "No videos found"}
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Images">
        <AccordionTrigger>Images</AccordionTrigger>
        <AccordionContent>
          <div className="flex max-w-full gap-2 overflow-x-scroll">
            {movie.images.backdrops.length > 0
              ? movie.images.backdrops.map((image) => (
                  <div key={image.file_path}>
                    <img
                      className=" min-w-[200px]"
                      src={`https://image.tmdb.org/t/p/w300${image.file_path}`}
                      alt={image.file_path}
                    />
                  </div>
                ))
              : "No images found"}
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Links">
        <AccordionTrigger>Links</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            <a
              className="hover:underline"
              href={`https://www.imdb.com/title/${movie.imdb_id}`}
              target="_blank"
              rel="noreferrer"
            >
              IMDB
            </a>
            <a
              className="hover:underline"
              href={`https://www.themoviedb.org/movie/${movie.id}`}
              target="_blank"
              rel="noreferrer"
            >
              TMDB
            </a>
            <a
              className="hover:underline"
              href={`${movie.homepage}`}
              target="_blank"
              rel="noreferrer"
            >
              {`${movie.title} homepage`}
            </a>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
