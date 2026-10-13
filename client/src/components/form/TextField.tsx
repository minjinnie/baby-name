import { useId } from "react";
import type { ChangeEvent, ReactNode } from "react";
import styles from "@/scss/components/FormField.module.scss";

export interface TextFieldProps {
  label: string;
  name: string;
  value: string;
  type?: "text" | "email" | "password";
  autoComplete?: string;
  /** Guidance shown under the input; replaced by `error` when there is one. */
  hint?: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  /** Rendered inside the input frame, after the input (e.g. a visibility toggle). */
  adornment?: ReactNode;
}

/** Labelled input with hint and error text wired up for screen readers. */
export default function TextField({
  label,
  name,
  value,
  type = "text",
  autoComplete,
  hint,
  error,
  onChange,
  onBlur,
  adornment,
}: TextFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const showHint = Boolean(hint) && !error;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div className={`${styles.inputFrame} ${error ? styles.inputFrameInvalid : ""}`}>
        <input
          id={id}
          className={styles.input}
          name={name}
          type={type}
          value={value}
          autoComplete={autoComplete}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : showHint ? hintId : undefined}
        />
        {adornment}
      </div>
      {showHint && (
        <p id={hintId} className={styles.fieldHint}>
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className={styles.fieldError}>
          {error}
        </p>
      )}
    </div>
  );
}
