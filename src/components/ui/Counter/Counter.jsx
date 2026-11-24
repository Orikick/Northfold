import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap.js";
import { LIGHT_MOTION } from "@/lib/motion.js";

const formatter = new Intl.NumberFormat("en-GB");

// Counts from 0 to value the first time it scrolls into view. Screen readers
// get the final value only; with reduced motion it is shown straight away.
export default function Counter({ value, suffix = "", duration = 1.6, className }) {
  const numberRef = useRef(null);
  const finalText = `${formatter.format(value)}${suffix}`;

  useGSAP(
    () => {
      const element = numberRef.current;
      const mm = gsap.matchMedia();

      mm.add(LIGHT_MOTION, () => {
        const state = { current: 0 };
        const render = () => {
          element.textContent = `${formatter.format(Math.round(state.current))}${suffix}`;
        };

        render();
        gsap.to(state, {
          current: value,
          duration,
          ease: "power2.out",
          onUpdate: render,
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });

        return () => {
          element.textContent = finalText;
        };
      });

      return () => mm.revert();
    },
    { dependencies: [value, suffix, duration] },
  );

  return (
    <span className={className}>
      <span ref={numberRef} aria-hidden="true">
        {finalText}
      </span>
      <span className="visually-hidden">{finalText}</span>
    </span>
  );
}
