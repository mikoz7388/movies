import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Input } from "./ui/input";

export function Header() {
  return (
    <header className="flex items-center justify-between py-4">
      <Link to="/">
        <img src="/logo.svg" alt="Vite Logo" className="h-8" />
      </Link>
      <Input placeholder="Search for a movie" />
      <ModeToggle />
    </header>
  );
}
