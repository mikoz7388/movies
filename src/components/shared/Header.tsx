import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.svg";
import { ChangeEvent, useState, FormEvent } from "react";
import { X, Search } from "lucide-react";

export function Header() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

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
    <header className="sticky top-0 z-50 border border-b-foreground bg-background shadow-lg">
      <div className="container mx-auto flex w-full items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Link to="/">
            <img src={logo} alt="Cool Movies logo" className="w-14" />
          </Link>
          <form
            onSubmit={handleSearch}
            role="search"
            aria-label="Movie search"
            className="relative flex items-center"
          >
            <Input
              placeholder="Search for a movie"
              className="w-96 pr-20"
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
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}
