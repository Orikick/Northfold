import { useCallback } from "react";
import useLenis from "@/hooks/useLenis.js";
import useReducedMotion from "@/hooks/useReducedMotion.js";

function headerHeight() {
  const header = document.querySelector("[data-site-header]");
  return header ? header.getBoundingClientRect().height : 0;
}

// Returns scrollTo("#section"): scrolls with Lenis when it is running,
// natively otherwise, then moves keyboard focus to the section.
export default function useScrollTo() {
  const lenis = useLenis();
  const reducedMotion = useReducedMotion();

  return useCallback(
    (hash) => {
      const id = hash.replace(/^#/, "");
      const behavior = reducedMotion ? "auto" : "smooth";

      if (id === "top") {
        if (lenis) lenis.scrollTo(0);
        else window.scrollTo({ top: 0, behavior });
        window.history.replaceState(null, "", window.location.pathname);
        return;
      }

      const target = document.getElementById(id);
      if (!target) return;

      if (lenis) {
        lenis.scrollTo(target, { offset: -headerHeight() });
      } else {
        // scroll-margin-top on sections keeps them clear of the sticky header.
        target.scrollIntoView({ behavior, block: "start" });
      }

      target.focus({ preventScroll: true });
      window.history.replaceState(null, "", `#${id}`);
    },
    [lenis, reducedMotion],
  );
}
