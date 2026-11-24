import { useRef } from "react";
import Photo from "@/components/ui/Photo/Photo.jsx";
import { gsap, useGSAP } from "@/lib/gsap.js";
import { FULL_MOTION } from "@/lib/motion.js";

// A Photo whose image drifts vertically inside its frame while the frame
// crosses the viewport. Transform only, desktop only, off for reduced motion.
// amount is the travel in percent of the image height (keep it at 8 or less).
export default function ParallaxImage({ amount = 8, className, ...photoProps }) {
  const frameRef = useRef(null);
  const imgRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(FULL_MOTION, () => {
        if (!imgRef.current) return;

        gsap.fromTo(
          imgRef.current,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: {
              trigger: frameRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      return () => mm.revert();
    },
    { dependencies: [amount] },
  );

  return (
    <div ref={frameRef} className={className}>
      <Photo {...photoProps} imgRef={imgRef} parallax />
    </div>
  );
}
