import styles from "./SkipLink.module.scss";

export default function SkipLink({ targetId = "main" }) {
  return (
    <a className={styles.skip} href={`#${targetId}`}>
      Skip to content
    </a>
  );
}
