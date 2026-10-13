import type { ChangeEvent } from "react";
import styles from "@/scss/components/FormField.module.scss";

interface CheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

/** Native checkbox wrapped in its label, so the whole row is clickable. */
export default function Checkbox({ label, name, checked, onChange }: CheckboxProps) {
  return (
    <label className={styles.checkbox}>
      <input type="checkbox" name={name} checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}
