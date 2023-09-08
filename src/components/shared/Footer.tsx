import tmdb from "@/assets/tmdb.svg";

export function Footer() {
  return (
    <footer className="fixed bottom-0 z-10 flex w-screen place-items-center justify-center gap-4 bg-background py-4">
      <p>Data provided by:</p>
      <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
        <img className="h-10 w-min " src={tmdb} alt="the movie db" />
      </a>
    </footer>
  );
}
