import { useEffect } from "react";
import Header from "@/components/layout/Header/Header.jsx";
import SkipLink from "@/components/layout/SkipLink/SkipLink.jsx";
import Button from "@/components/ui/Button/Button.jsx";
import styles from "./NotFound.module.scss";

export default function NotFound() {
  useEffect(() => {
    const previous = document.title;
    document.title = "Page not found | Northfold";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <>
      <SkipLink />
      <Header variant="minimal" />
      <main id="main" className={styles.main} tabIndex={-1}>
        <h1 className={styles.title}>This page isn't here</h1>
        <p className={styles.body}>The link may be out of date, or the address may have a typo.</p>
        <Button to="/">Go to the home page</Button>
      </main>
    </>
  );
}
