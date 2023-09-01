import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border border-b-foreground bg-background shadow-lg">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between p-4 px-4 ">
        <div className="flex place-content-center gap-4">
          <Link to="/">
            <img src="/logo.svg" alt="Vite Logo" className="w-14" />
          </Link>
          <Input placeholder="Search for a movie" className="max-w-lg" />
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}
