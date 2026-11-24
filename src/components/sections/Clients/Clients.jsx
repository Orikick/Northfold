import Marquee from "@/components/ui/Marquee/Marquee.jsx";
import { clients } from "@/data/clients.js";
import styles from "./Clients.module.scss";

export default function Clients() {
  if (clients.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="clients-title">
      <h2 id="clients-title" className="visually-hidden">
        Clients
      </h2>
      <Marquee items={clients} label="Client list" />
    </section>
  );
}
