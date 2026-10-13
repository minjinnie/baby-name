import { useCallback, useEffect, useRef, useState } from "react";
import { LAST_ACTIVITY_KEY, readLastActivity, writeLastActivity } from "@/auth/storage";

const ACTIVITY_EVENTS = ["pointerdown", "pointermove", "keydown", "wheel", "scroll", "touchstart"] as const;

// pointermove and scroll fire many times a second; recording at most this often
// keeps storage writes cheap without affecting a 30-minute timeout.
const RECORD_THROTTLE_MS = 5_000;

interface IdleTimeoutOptions {
  /** How long without activity before `onIdle` runs. */
  timeoutMs: number;
  /** How long before the timeout the warning phase starts. */
  warningMs: number;
  /** The timer only runs while this is true (e.g. while signed in). */
  enabled: boolean;
  onIdle: () => void;
}

interface IdleTimeoutState {
  /** True during the final `warningMs` before logout. */
  isWarning: boolean;
  /** When `onIdle` will run (ms timestamp), or null while disabled. */
  deadline: number | null;
  /** Records activity now, which also dismisses the warning. */
  stayActive: () => void;
}

/**
 * Tracks user activity and calls `onIdle` once the user has been inactive for
 * `timeoutMs`, with a warning phase before that.
 *
 * The last-activity time is shared through localStorage, so activity in any open
 * tab keeps every tab alive. Rather than resetting a timer on each event, the
 * timer re-reads the shared timestamp when it fires and reschedules itself.
 *
 * During the warning, background activity (like moving the mouse) is ignored so
 * the user has to respond explicitly with `stayActive`.
 */
export function useIdleTimeout({ timeoutMs, warningMs, enabled, onIdle }: IdleTimeoutOptions): IdleTimeoutState {
  const [isWarning, setIsWarning] = useState(false);
  const [deadline, setDeadline] = useState<number | null>(null);

  const onIdleRef = useRef(onIdle);
  useEffect(() => {
    onIdleRef.current = onIdle;
  }, [onIdle]);

  // Lets `stayActive` reach the effect's scheduler from outside it.
  const stayActiveRef = useRef<() => void>(() => undefined);
  const stayActive = useCallback(() => stayActiveRef.current(), []);

  useEffect(() => {
    if (!enabled) {
      setIsWarning(false);
      setDeadline(null);
      return;
    }

    let localLastActivity = Date.now();
    let warning = false;
    let timer: number | undefined;

    const lastActivity = () => Math.max(readLastActivity() ?? 0, localLastActivity);

    const check = () => {
      window.clearTimeout(timer);
      const idleAt = lastActivity() + timeoutMs;
      const remaining = idleAt - Date.now();

      if (remaining <= 0) {
        onIdleRef.current();
        return;
      }

      warning = remaining <= warningMs;
      setIsWarning(warning);
      setDeadline(idleAt);
      // Wake up when the warning should start, or at the deadline if it already has.
      timer = window.setTimeout(check, warning ? remaining : remaining - warningMs);
    };

    const record = (now: number) => {
      localLastActivity = now;
      writeLastActivity(now);
    };

    const handleActivity = () => {
      const now = Date.now();
      if (warning || now - localLastActivity < RECORD_THROTTLE_MS) {
        return;
      }
      record(now);
    };

    stayActiveRef.current = () => {
      record(Date.now());
      check();
    };

    // Timers are paused while a laptop sleeps, so check as soon as the tab is visible again.
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        check();
      }
    };

    // "Stay signed in" in another tab should dismiss this tab's warning too.
    const handleStorage = (event: StorageEvent) => {
      if (event.key === LAST_ACTIVITY_KEY) {
        check();
      }
    };

    record(localLastActivity);
    ACTIVITY_EVENTS.forEach((event) => window.addEventListener(event, handleActivity, { passive: true }));
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("storage", handleStorage);
    check();

    return () => {
      window.clearTimeout(timer);
      stayActiveRef.current = () => undefined;
      ACTIVITY_EVENTS.forEach((event) => window.removeEventListener(event, handleActivity));
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, [enabled, timeoutMs, warningMs]);

  return { isWarning, deadline, stayActive };
}
