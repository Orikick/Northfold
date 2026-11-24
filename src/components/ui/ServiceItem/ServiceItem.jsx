import styles from "./ServiceItem.module.scss";

export default function ServiceItem({ service }) {
  return (
    <li className={styles.item}>
      <h3 className={styles.name}>{service.name}</h3>
      <div className={styles.detail}>
        <p>{service.description}</p>
        <ul className={styles.deliverables} aria-label={`${service.name} deliverables`}>
          {service.deliverables.map((deliverable) => (
            <li key={deliverable}>{deliverable}</li>
          ))}
        </ul>
      </div>
    </li>
  );
}
