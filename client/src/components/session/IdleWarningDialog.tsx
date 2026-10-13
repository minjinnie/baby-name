import { useEffect, useId, useRef, useState } from "react";
import type { SyntheticEvent } from "react";
import styles from "@/scss/components/IdleWarningDialog.module.scss";

interface IdleWarningDialogProps {
  open: boolean;
  /** When the automatic logout happens (ms timestamp). */
  deadline: number | null;
  onStaySignedIn: () => void;
  onLogOut: () => void;
}

function formatRemaining(ms: number): string {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

/** Re-renders every second while `active`, returning the current time. */
function useNow(active: boolean): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!active) {
      return;
    }
    setNow(Date.now());
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, [active]);
  return now;
}

/**
 * Modal warning shown shortly before an idle logout. Uses the native <dialog>
 * element, which provides focus trapping, Escape handling and the backdrop.
 */
export default function IdleWarningDialog({ open, deadline, onStaySignedIn, onLogOut }: IdleWarningDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const stayButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const now = useNow(open);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    if (open && !dialog.open) {
      dialog.showModal();
      // showModal focuses the first button; the safe choice should get focus instead,
      // so keyboard users can confirm with Enter straight away.
      stayButtonRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Escape is a natural "I'm still here", so treat it the same as the main button.
  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    onStaySignedIn();
  };

  const remaining = deadline === null ? 0 : deadline - now;

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={handleCancel}
    >
      <div className={styles.icon} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      </div>

      <h2 id={titleId} className={styles.title}>
        Are you still there?
      </h2>
      <p id={descriptionId} className={styles.message}>
        For your security, you'll be logged out due to inactivity in
      </p>
      <p className={styles.countdown} role="timer">
        {formatRemaining(remaining)}
      </p>

      <div className={styles.actions}>
        <button type="button" className={styles.secondary} onClick={onLogOut}>
          Log out
        </button>
        <button ref={stayButtonRef} type="button" className={styles.primary} onClick={onStaySignedIn}>
          Stay signed in
        </button>
      </div>
    </dialog>
  );
}
