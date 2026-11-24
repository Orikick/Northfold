import { useState } from "react";
import cx from "@/lib/cx.js";
import styles from "./Marquee.module.scss";

// Endless horizontal ticker. The list is rendered twice and the track slides
// by half its width, so the loop has no seam. Pauses on hover and with the
// button; with reduced motion it becomes a static wrapped list.
export default function Marquee({ items, label, duration = 45 }) {
  const [paused, setPaused] = useState(false);

  return (
    <div className={styles.wrap}>
      <div className={cx(styles.marquee, paused && styles.paused)}>
        <div className={styles.track} style={{ "--marquee-duration": `${duration}s` }}>
          <ul className={styles.group} aria-label={label}>
            {items.map((item) => (
              <li key={item} className={styles.item}>
                {item}
              </li>
            ))}
          </ul>
          <ul className={cx(styles.group, styles.clone)} aria-hidden="true">
            {items.map((item) => (
              <li key={item} className={styles.item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button type="button" className={styles.control} onClick={() => setPaused((value) => !value)}>
        {paused ? "Play" : "Pause"}
        <span className="visually-hidden"> scrolling {label.toLowerCase()}</span>
      </button>
    </div>
  );
}
