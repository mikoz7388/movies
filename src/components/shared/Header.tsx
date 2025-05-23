import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ThemeToggle } from "@/components/shared/mode-toggle";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.svg";
import { ChangeEvent, useState, FormEvent, useEffect, useRef } from "react";
import { X, Search } from "lucide-react";

export function Header() {
  const [atTop, setAtTop] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") || "";
  const [query, setQuery] = useState(queryParam);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(queryParam);
  }, [queryParam]);

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
      setSearchParams({ query: query.trim(), page: "1" });
      navigate(`/search?q=${encodeURIComponent(query.trim())}&page=1`);
      inputRef.current?.blur();
    }
    setQuery("");
  };

  const handleClear = () => {
    setQuery("");
    setSearchParams({});
  };

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
          <h1 className="ml-4 hidden items-center self-center text-2xl text-foreground 2xl:flex">
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
              ref={inputRef}
              placeholder="Search for a movie"
              className="h-10 max-w-[500px] pr-20 text-lg"
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
                <X size={20} />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </form>
          <div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
