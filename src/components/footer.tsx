export function Footer() {
  return (
    <footer className="fixed bottom-0 mb-4 flex w-screen place-items-center justify-center gap-4">
      <p>Data provided by:</p>
      <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
        <img className="h-10 w-min " src="/tmdb.svg" alt="the movie db" />
      </a>
    </footer>
  );
}
