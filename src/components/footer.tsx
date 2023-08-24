export function Footer() {
  return (
    <footer className="flex gap-4 justify-center place-items-center fixed bottom-0 w-screen mb-4">
      <p>Data provided by:</p>
      <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
        <img className="h-10 w-min " src="tmdb.svg" alt="the movie db" />
      </a>
    </footer>
  );
}
