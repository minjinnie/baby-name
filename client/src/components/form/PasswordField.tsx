import { useState } from "react";
import TextField from "@/components/form/TextField";
import type { TextFieldProps } from "@/components/form/TextField";
import styles from "@/scss/components/FormField.module.scss";

/** TextField for passwords, with a button to show or hide what was typed. */
export default function PasswordField(props: Omit<TextFieldProps, "type" | "adornment">) {
  const [isVisible, setIsVisible] = useState(false);
  const label = props.label.toLowerCase();

  return (
    <TextField
      {...props}
      type={isVisible ? "text" : "password"}
      adornment={
        <button
          type="button"
          className={styles.visibilityToggle}
          onClick={() => setIsVisible((visible) => !visible)}
          aria-label={isVisible ? `Hide ${label}` : `Show ${label}`}
          aria-pressed={isVisible}
        >
          {isVisible ? <EyeIcon /> : <EyeOffIcon />}
        </button>
      }
    />
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M3 3l18 18" />
    </svg>
  );
}
