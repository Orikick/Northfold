import { Link } from "react-router";
import useScrollTo from "@/hooks/useScrollTo.js";
import cx from "@/lib/cx.js";
import styles from "./Button.module.scss";

// One look, three elements: <Link> for routes (to), <a> for links (href,
// in-page hashes scroll smoothly) and <button> for actions.
export default function Button({
  to,
  href,
  variant = "primary",
  size = "default",
  className,
  onClick,
  children,
  ...rest
}) {
  const scrollTo = useScrollTo();
  const classes = cx(styles.button, styles[variant], size === "small" && styles.small, className);

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    const handleClick = (event) => {
      if (href.startsWith("#")) {
        event.preventDefault();
        scrollTo(href);
      }
      onClick?.(event);
    };

    return (
      <a href={href} className={classes} onClick={handleClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
