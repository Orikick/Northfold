import Counter from "@/components/ui/Counter/Counter.jsx";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading.jsx";
import { stats } from "@/data/stats.js";
import styles from "./Numbers.module.scss";

export default function Numbers() {
  return (
    <section id="studio" className={styles.section} aria-labelledby="studio-title" tabIndex={-1}>
      <div className={styles.inner}>
        <SectionHeading id="studio-title" title="Small on purpose">
          Northfold has stayed at six people since 2019. A partner leads every project, and the people in your
          first meeting are the people who do the work.
        </SectionHeading>
        <dl className={styles.stats}>
          {stats.map((stat) => (
            <div key={stat.id} className={styles.stat}>
              <dt className={styles.label}>{stat.label}</dt>
              <dd className={styles.value}>
                <Counter value={stat.value} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
