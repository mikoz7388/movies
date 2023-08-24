import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Input } from "./ui/input";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 border border-b-foreground">
      <div className="flex gap-4 place-content-center">
        <Link to="/">
          <img src="/logo.svg" alt="Vite Logo" className="w-14" />
        </Link>
        <Input placeholder="Search for a movie" className="max-w-sm" />
      </div>
      <ModeToggle />
    </header>
  );
}
