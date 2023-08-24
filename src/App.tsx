import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { getMovies } from "@/lib/api";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

function App() {
  const { data } = useQuery(["movies"], getMovies);

  console.log(data);
  return (
    <>
      <Header />
      {data
        ? data.results.map((movie) => <h1 key={movie.id}>{movie.title}</h1>)
        : null}
      <Button>elo</Button>
      <Footer />
    </>
  );
}

export default App;
