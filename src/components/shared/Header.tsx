import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.svg";
import { ChangeEvent, useState, FormEvent, useEffect } from "react";
import { X, Search } from "lucide-react";

export function Header() {
  const [query, setQuery] = useState("");
  const [atTop, setAtTop] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY < 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  const handleClear = () => setQuery("");

  return (
    <header
      className={`sticky top-0 z-50 bg-background transition-all duration-300 ${
        atTop
          ? "border-b border-b-foreground opacity-100"
          : "border-b-0 opacity-80"
      }`}
    >
      <div className="container mx-auto flex w-full items-center justify-between py-4">
        <Link
          to="/"
          className={`flex w-14 items-center transition ${
            atTop ? "scale-100" : "scale-[0.8]"
          }`}
        >
          <img src={logo} alt="Cool Movies logo" />
          <h1 className="ml-4 hidden items-center self-center text-3xl text-foreground 2xl:flex">
            Cool Movies
          </h1>
        </Link>
        <div className="flex items-center gap-6">
          <form
            onSubmit={handleSearch}
            role="search"
            aria-label="Movie search"
            className="relative flex items-center"
          >
            <Input
              placeholder="Search for a movie"
              className="h-14 w-[28rem] pr-20 text-xl"
              value={query}
              onChange={handleInputChange}
              aria-label="Search movies"
            />
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-12 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
                tabIndex={0}
              >
                <X size={24} />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
              aria-label="Search"
            >
              <Search size={24} />
            </button>
          </form>
          <div className="scale-125">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
