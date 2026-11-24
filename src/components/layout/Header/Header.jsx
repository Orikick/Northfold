import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router";
import AnchorLink from "@/components/ui/AnchorLink/AnchorLink.jsx";
import Button from "@/components/ui/Button/Button.jsx";
import Logo from "@/components/ui/Logo/Logo.jsx";
import useMediaQuery from "@/hooks/useMediaQuery.js";
import cx from "@/lib/cx.js";
import { navLinks } from "@/data/navigation.js";
import styles from "./Header.module.scss";

// variant="home" shows section links; variant="minimal" (404 page) shows
// only the logo and a link back to the home page.
export default function Header({ variant = "home" }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const menuId = useId();
  const isWide = useMediaQuery("(min-width: 1024px)");

  // The mobile menu never stays open once the inline nav is visible.
  useEffect(() => {
    if (isWide) setOpen(false);
  }, [isWide]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  if (variant === "minimal") {
    return (
      <header className={styles.header} data-site-header>
        <div className={styles.inner}>
          <Link className={styles.logo} to="/" aria-label="Northfold home">
            <Logo />
          </Link>
          <Link className={styles.link} to="/">
            Back to home
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className={styles.header} data-site-header>
      <div className={styles.inner}>
        <AnchorLink className={styles.logo} href="#top" aria-label="Northfold, back to top" onNavigate={close}>
          <Logo />
        </AnchorLink>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className={styles.bars} aria-hidden="true" />
          {open ? "Close" : "Menu"}
        </button>

        <nav id={menuId} className={cx(styles.nav, open && styles.navOpen)} aria-label="Main">
          <ul className={styles.list}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <AnchorLink className={styles.link} href={link.href} onNavigate={close}>
                  {link.label}
                </AnchorLink>
              </li>
            ))}
          </ul>
          <Button href="#contact" size="small" onClick={close}>
            Start a project
          </Button>
        </nav>
      </div>
    </header>
  );
}
