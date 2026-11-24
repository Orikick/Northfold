import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap.js";
import { LIGHT_MOTION } from "@/lib/motion.js";

// Renders text that slides up line by line from behind a mask.
// SplitText re-splits on resize and when web fonts finish loading, and keeps
// the original text available to screen readers. With reduced motion the
// text is simply shown.
export default function SplitLines({ as: Tag = "p", delay = 0.1, children, ...rest }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(LIGHT_MOTION, () => {
        const split = SplitText.create(ref.current, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.1,
              ease: "power4.out",
              stagger: 0.1,
              delay,
            }),
        });

        return () => split.revert();
      });

      return () => mm.revert();
    },
    { dependencies: [children, delay] },
  );

  return (
    <Tag ref={ref} {...rest}>
      {children}
    </Tag>
  );
}
