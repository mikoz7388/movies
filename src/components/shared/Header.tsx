import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { Input } from "@/components/ui/input";

import logo from "@/assets/logo.svg";
import { ChangeEvent, useState } from "react";

export function Header() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search/${query}`);
  };

  return (
    <header className="sticky top-0 z-50 border border-b-foreground bg-background shadow-lg">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between p-4 px-4 ">
        <div className="flex place-content-center gap-4">
          <Link to="/">
            <img src={logo} alt="Vite Logo" className="w-14" />
          </Link>
          <form onSubmit={handleSearch}>
            <Input
              placeholder="Search for a movie"
              className="max-w-lg"
              value={query}
              onChange={(e) => handleInputChange(e)}
            />
          </form>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}
