import { Link } from "@tanstack/react-router";
import { QrCode, Github } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between gap-3 rounded-2xl px-4 py-3 qf-glass">
        <Link to="/" className="flex items-center gap-2 font-bold tracking-tight">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-cyan-500 text-white shadow-lg">
            <QrCode className="h-5 w-5" />
          </div>
          <span className="text-lg">QRForge</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-medium">
          <Link
            to="/"
            className="rounded-lg px-3 py-2 transition hover:bg-foreground/5"
            activeProps={{ className: "rounded-lg px-3 py-2 bg-foreground/10" }}
          >
            Home
          </Link>
          <Link
            to="/analytics"
            className="rounded-lg px-3 py-2 transition hover:bg-foreground/5"
            activeProps={{ className: "rounded-lg px-3 py-2 bg-foreground/10" }}
          >
            Analytics
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}