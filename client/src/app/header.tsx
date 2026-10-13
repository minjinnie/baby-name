import { useEffect, useId, useRef, useState, type SubmitEvent } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { LOGIN_PATH } from "@/auth/config";
import type { User } from "@/auth/types";
import { useAuth } from "@/auth/useAuth";
import type { LoginLocationState } from "@/components/session/IdleSessionManager";

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
  const { user } = useAuth();
  const [query, setQuery] = useState("");

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    onSearch?.(query.trim());
  }

  return (
    <header className="site-header">
      <div className="site-header__top">
        {user ? (
          <UserMenu user={user} />
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
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

/** The signed-in user's first name, which opens a dropdown with a Log out option. */
function UserMenu({ user }: { user: User }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const logOutRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const firstName = user.name.trim().split(/\s+/)[0];

  // While open: focus Log out, and close on a click outside or Escape.
  useEffect(() => {
    if (!open) {
      return;
    }
    logOutRef.current?.focus();

    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function handleLogOut() {
    setOpen(false);
    void signOut();
    const state: LoginLocationState = { reason: "signed-out" };
    navigate(LOGIN_PATH, { replace: true, state });
  }

  return (
    <div className="user-menu" ref={menuRef}>
      <button
        ref={triggerRef}
        type="button"
        className="user-menu__trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="user-menu__name">{firstName}</span>
        <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div id={menuId} className="user-menu__dropdown" role="menu">
          <div className="user-menu__info">
            <p className="user-menu__full-name">{user.name}</p>
            <p className="user-menu__email">{user.email}</p>
          </div>
          <button ref={logOutRef} type="button" role="menuitem" className="user-menu__item" onClick={handleLogOut}>
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
