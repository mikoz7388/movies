import { useLoaderData } from "react-router-dom";
import { PersonDetailsMovieCredits, PersonDetails } from "@/types";
import { PersonCard } from "./PersonCard";
import { KnownFor } from "./KnownFor";

type PersonPageData = PersonDetails & {
  movie_credits: PersonDetailsMovieCredits;
};

export function PersonPage() {
  const person = useLoaderData() as PersonPageData;
  const MostPopularMovies = person.movie_credits.cast.sort((a, b) => {
    return b.popularity - a.popularity;
  });
  console.log(MostPopularMovies);

  return (
    <div className="container mb-20 mt-4">
      <PersonCard person={person} />
      <KnownFor list={MostPopularMovies} />
    </div>
  );
}
