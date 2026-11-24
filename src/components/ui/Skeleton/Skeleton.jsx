import cx from "@/lib/cx.js";
import styles from "./Skeleton.module.scss";

// Pulsing placeholder block. Decorative: pair it with a visually hidden
// "Loading" message inside a role="status" container.
export default function Skeleton({ className, style }) {
  return <span className={cx(styles.skeleton, className)} style={style} aria-hidden="true" />;
}
