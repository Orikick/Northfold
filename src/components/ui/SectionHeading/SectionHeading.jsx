import cx from "@/lib/cx.js";
import styles from "./SectionHeading.module.scss";

// Section title with an optional supporting paragraph. Pass the same id to
// the section's aria-labelledby.
export default function SectionHeading({ id, title, children, compact = false }) {
  return (
    <div className={cx(styles.heading, compact && styles.compact)}>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {children && <p className={styles.lede}>{children}</p>}
    </div>
  );
}
