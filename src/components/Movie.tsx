import { useLoaderData } from "react-router-dom";

import { Container } from "./ui/container";

function Movie() {
  const movie = useLoaderData();
  console.log("movie", { movie });
  return (
    <>
      <Container>
        {movie ? JSON.stringify(movie, null, 2) : null}
        {/* {data ? <Hero movie={data.results[0]} /> : null} */}
        {/* {data
            ? data.results.map((movie) => <h1 key={movie.id}>{movie.title}</h1>)
            : null} */}
        {/* {data ? JSON.stringify(data.results[0], null, 2) : null} */}
      </Container>
    </>
  );
}

export default Movie;
