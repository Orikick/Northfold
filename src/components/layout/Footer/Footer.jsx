import AnchorLink from "@/components/ui/AnchorLink/AnchorLink.jsx";
import Logo from "@/components/ui/Logo/Logo.jsx";
import { contact, navLinks } from "@/data/navigation.js";
import styles from "./Footer.module.scss";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <Logo />
          <p className={styles.tagline}>Brand and digital design studio. {contact.location}.</p>
        </div>

        <nav aria-label="Footer">
          <ul className={styles.list}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <AnchorLink className={styles.link} href={link.href}>
                  {link.label}
                </AnchorLink>
              </li>
            ))}
            <li>
              <AnchorLink className={styles.link} href="#contact">
                Contact
              </AnchorLink>
            </li>
          </ul>
        </nav>

        <div className={styles.meta}>
          <a className={styles.link} href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          <AnchorLink className={styles.link} href="#top">
            Back to top
          </AnchorLink>
        </div>

        <div className={styles.legal}>
          <p>
            © {year} Northfold ApS. Northfold is a fictional studio made for a front-end demo. Photos from Unsplash.
          </p>
          <p className={styles.credit}>Designed and developed by Orest Labiak</p>
        </div>
      </div>
    </footer>
  );
}
