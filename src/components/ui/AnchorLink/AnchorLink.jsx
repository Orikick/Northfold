import useScrollTo from "@/hooks/useScrollTo.js";

// In-page link ("#work"). Scrolls with Lenis when it is running and keeps a
// real href so the link still works without JavaScript.
export default function AnchorLink({ href, onNavigate, children, ...rest }) {
  const scrollTo = useScrollTo();

  const handleClick = (event) => {
    event.preventDefault();
    scrollTo(href);
    onNavigate?.();
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
