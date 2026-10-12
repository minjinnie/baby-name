import { useState, type SubmitEvent } from "react";
import { Link, NavLink } from "react-router";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/discover", label: "Discover" },
  { to: "/favorites", label: "Favorites" },
  { to: "/matches", label: "Matches" },
  { to: "/about", label: "About" },
];

type HeaderProps = {
  onSearch?: (query: string) => void;
};

export default function Header({ onSearch }: HeaderProps) {
  const [query, setQuery] = useState("");

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    onSearch?.(query.trim());
  }

  return (
    <header className="site-header">
      <div className="site-header__top">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>

      <div className="site-header__main">
        <Link to="/" className="site-header__logo">
          <img src="/LittleRoots_Logo.png" alt="LittleRoots" />
        </Link>

        <nav className="site-header__nav" aria-label="Main">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === "/"}>
              {label}
            </NavLink>
          ))}
        </nav>

        <form className="site-header__search" role="search" onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Search"
            aria-label="Search names"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" aria-label="Search">
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
        </form>
      </div>
    </header>
  );
}
