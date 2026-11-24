import { useId } from "react";
import cx from "@/lib/cx.js";
import styles from "./FormField.module.scss";

// Label + control + hint + error, wired together for assistive tech.
// type: any <input> type, "textarea" or "select" (with options).
export default function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  hint,
  required = false,
  options = [],
  ...rest
}) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = cx(hint && hintId, error && errorId) || undefined;

  const shared = {
    id,
    name,
    value,
    onChange,
    required,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    className: cx(styles.control, error && styles.invalid),
    ...rest,
  };

  let control;
  if (type === "textarea") {
    control = <textarea rows={5} {...shared} />;
  } else if (type === "select") {
    control = (
      <select {...shared}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  } else {
    control = <input type={type} {...shared} />;
  }

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {!required && <span className={styles.optional}> (optional)</span>}
      </label>
      {control}
      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
