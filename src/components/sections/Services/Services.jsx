import SectionHeading from "@/components/ui/SectionHeading/SectionHeading.jsx";
import ServiceItem from "@/components/ui/ServiceItem/ServiceItem.jsx";
import { services } from "@/data/services.js";
import styles from "./Services.module.scss";

export default function Services() {
  return (
    <section id="services" className={styles.section} aria-labelledby="services-title" tabIndex={-1}>
      <div className={styles.inner}>
        <SectionHeading id="services-title" title="What we do">
          Four kinds of work, usually combined. Most clients start with one and stay for the rest.
        </SectionHeading>
        <ul className={styles.list}>
          {services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </ul>
      </div>
    </section>
  );
}
