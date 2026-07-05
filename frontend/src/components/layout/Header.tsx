import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  departmentIdentity,
  primaryNavigation,
  searchPages,
} from "@/content/siteContent";
import { cn } from "@/lib/utils";
import Logo from "@/assets/ccs-logo.png";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isSolid = isScrolled || searchOpen;

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return (
      location.pathname === href || location.pathname.startsWith(`${href}/`)
    );
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    searchInputRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen]);

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };

  const results = query
    ? searchPages.filter((page) => {
        const q = query.toLowerCase();
        return (
          page.title.toLowerCase().includes(q) ||
          page.keywords.some((keyword) => keyword.toLowerCase().includes(q))
        );
      })
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      navigate(results[0].href);
      closeSearch();
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500",
        isSolid
          ? "bg-white/60 backdrop-blur-md shadow-sm text-zinc-900"
          : "bg-transparent text-white",
      )}
    >
      <div
        className={cn(
          "border-b transition-colors duration-300",
          isSolid
            ? "border-zinc-200 bg-primary text-white/90"
            : "border-white/10 bg-primary text-white/90",
        )}
      >
        <div className="container flex items-center justify-between py-2 text-xs md:text-sm">
          <span>{departmentIdentity.institution}</span>
          <button
            type="button"
            onClick={() => setSearchOpen((open) => !open)}
            className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
            aria-label={searchOpen ? "Close search" : "Search site"}
            aria-expanded={searchOpen}
          >
            <Search className="h-4 w-4" />
            Search
          </button>
        </div>
      </div>

      {searchOpen && (
        <div
          className={cn(
            "relative z-50 border-b backdrop-blur-sm animate-in slide-in-from-top-2 duration-200",
            isSolid
              ? "bg-white border-zinc-200"
              : "bg-primary/95 border-white/10 text-white",
          )}
        >
          <div className="container py-4">
            <form
              onSubmit={handleSubmit}
              className="relative mx-auto flex max-w-xl gap-2"
              role="search"
            >
              <div className="relative flex-1">
                <Input
                  ref={searchInputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search the department website"
                  aria-label="Search the department website"
                  role="combobox"
                  aria-expanded={results.length > 0}
                  aria-controls="search-results"
                  className={cn(
                    isSolid
                      ? "bg-zinc-50"
                      : "bg-white/10 text-white placeholder:text-white/50 border-white/20",
                  )}
                />

                {query && (
                  <div
                    id="search-results"
                    className="absolute left-0 right-0 top-full z-10 mt-2 max-h-80 overflow-y-auto rounded-lg border bg-white text-zinc-900 shadow-lg"
                  >
                    {results.length > 0 ? (
                      results.map((page) => (
                        <Link
                          key={page.href}
                          to={page.href}
                          onClick={closeSearch}
                          className="block px-4 py-3 text-sm hover:bg-zinc-100"
                        >
                          {page.title}
                        </Link>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-zinc-500">
                        No results found.
                      </div>
                    )}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                variant={isSolid ? "outline" : "secondary"}
              >
                Search
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={closeSearch}
                aria-label="Close search"
                className={cn(!isSolid && "hover:bg-white/10 text-white")}
              >
                <X className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}

      <div
        className={cn(
          "container flex items-center justify-between gap-6 transition-all duration-300",
          isSolid ? "py-2" : "py-4",
        )}
      >
        <Link to="/" className="flex min-w-0 items-center gap-3 group">
          <img
            src={Logo}
            alt="College of Computer Studies logo"
            className="h-14 w-14 object-contain transition-all duration-300"
          />
          <div className="min-w-0">
            <div
              className={cn(
                "text-sm font-semibold leading-tight md:text-base transition-colors",
                isSolid ? "text-zinc-900" : "text-white",
              )}
            >
              {departmentIdentity.name}
            </div>
            <div
              className={cn(
                "text-xs leading-tight transition-colors",
                isSolid ? "text-zinc-500" : "text-white/70",
              )}
            >
              {departmentIdentity.college}
            </div>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary navigation"
        >
          {primaryNavigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "relative rounded-sm px-2.5 py-2 text-sm font-medium transition-all duration-200",
                  isSolid
                    ? "text-zinc-700 hover:bg-zinc-100"
                    : "text-white/90 hover:bg-white/10",
                  active &&
                    (isSolid
                      ? "text-blue-600 font-semibold"
                      : "text-sky-300 font-semibold after:absolute after:bottom-0 after:left-2.5 after:right-2.5 after:h-0.5 after:bg-sky-300"),
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              className={cn(!isSolid && "text-white hover:bg-white/10")}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-80 overflow-y-auto bg-white text-zinc-900"
          >
            <nav className="mt-8 grid gap-1" aria-label="Mobile navigation">
              {primaryNavigation.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "rounded-sm px-3 py-3 text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-zinc-700 hover:bg-zinc-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}