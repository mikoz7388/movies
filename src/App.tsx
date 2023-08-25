import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { apiClient } from "./lib/api";
import { MovieList } from "./types";
import { Hero } from "./hero";
import { Container } from "./components/ui/container";

function App() {
  const { data } = useQuery(["movies"], async () => {
    const response = await apiClient.get("/trending/movie/day");
    return response.data as MovieList;
  });

  return (
    <>
      <Header />
      <Container>
        {data ? <Hero movie={data.results[0]} /> : null}
        {/* {data
        ? data.results.map((movie) => <h1 key={movie.id}>{movie.title}</h1>)
        : null} */}
        {/* {data ? JSON.stringify(data.results[0], null, 2) : null} */}
        <Button>elo</Button>
      </Container>
      <Footer />
    </>
  );
}

export default App;
