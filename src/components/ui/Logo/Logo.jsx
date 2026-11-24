import styles from "./Logo.module.scss";

// Wordmark with the "folded corner" mark. The svg is decorative: the text
// next to it carries the name.
export default function Logo() {
  return (
    <span className={styles.logo}>
      <svg className={styles.mark} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M3 21V3h11l7 7v11z" fill="currentColor" />
        <path className={styles.fold} d="M14 3l7 7h-7z" />
      </svg>
      Northfold
    </span>
  );
}
