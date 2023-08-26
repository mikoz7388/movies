import { useLoaderData } from "react-router-dom";

import { Container } from "./ui/container";

function Movie() {
  const movie = useLoaderData();
  return (
    <>
      <Container>{movie ? JSON.stringify(movie, null, 2) : null}</Container>
    </>
  );
}

export default Movie;
