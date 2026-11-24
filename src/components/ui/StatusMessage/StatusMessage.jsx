import Button from "@/components/ui/Button/Button.jsx";
import cx from "@/lib/cx.js";
import styles from "./StatusMessage.module.scss";

// Empty and error states for data-driven sections.
// variant: "empty" | "error". tone: "light" | "dark" (the section background).
export default function StatusMessage({
  variant = "empty",
  tone = "light",
  title,
  children,
  actionLabel,
  onAction,
  className,
}) {
  return (
    <div className={cx(styles.box, className)} role={variant === "error" ? "alert" : "status"}>
      <p className={styles.title}>{title}</p>
      {children && <p className={styles.body}>{children}</p>}
      {actionLabel && (
        <Button variant={tone === "dark" ? "light" : "primary"} onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
