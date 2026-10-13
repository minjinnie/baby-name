import type { Session } from "@/auth/types";

// Every key this app writes starts with this prefix, so logout can clear them all
// without touching storage that belongs to anything else on the same origin.
const PREFIX = "littleroots.";
const SESSION_KEY = `${PREFIX}session`;
const LAST_ACTIVITY_KEY = `${PREFIX}lastActivity`;

export { SESSION_KEY, LAST_ACTIVITY_KEY };

function isSession(value: unknown): value is Session {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const { user, token } = value as Partial<Session>;
  return (
    typeof token === "string" &&
    typeof user === "object" &&
    user !== null &&
    typeof user.id === "string" &&
    typeof user.name === "string" &&
    typeof user.email === "string"
  );
}

// Storage can throw (private mode, blocked site data), so every access is guarded
// and callers fall back to in-memory state.

function readSessionFrom(storage: Storage): Session | null {
  try {
    const raw = storage.getItem(SESSION_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    return isSession(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/** The saved session, whether it was remembered (localStorage) or not (sessionStorage). */
export function readSession(): Session | null {
  return readSessionFrom(localStorage) ?? readSessionFrom(sessionStorage);
}

/**
 * Saves the session. "Remembered" sessions go in localStorage and survive closing
 * the browser; others go in sessionStorage, which the browser clears on close.
 */
export function writeSession(session: Session, remember: boolean): void {
  const [target, other] = remember ? [localStorage, sessionStorage] : [sessionStorage, localStorage];
  try {
    other.removeItem(SESSION_KEY);
    target.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // Ignore: the session still lives in memory for this tab.
  }
}

/** Timestamp (ms) of the last user activity in any tab, or null if unknown. */
export function readLastActivity(): number | null {
  try {
    const value = Number(localStorage.getItem(LAST_ACTIVITY_KEY));
    return Number.isFinite(value) && value > 0 ? value : null;
  } catch {
    return null;
  }
}

export function writeLastActivity(timestamp: number): void {
  try {
    localStorage.setItem(LAST_ACTIVITY_KEY, String(timestamp));
  } catch {
    // Ignore: the idle timer falls back to this tab's own activity.
  }
}

/** Removes every key this app has stored, in both storages. Called on logout. */
export function clearAuthStorage(): void {
  for (const storage of [localStorage, sessionStorage]) {
    try {
      Object.keys(storage)
        .filter((key) => key.startsWith(PREFIX))
        .forEach((key) => storage.removeItem(key));
    } catch {
      // Ignore: nothing was stored.
    }
  }
}
