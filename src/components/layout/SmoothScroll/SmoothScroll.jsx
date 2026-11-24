import { useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap.js";
import { LenisContext } from "@/hooks/useLenis.js";
import useMediaQuery from "@/hooks/useMediaQuery.js";
import { FULL_MOTION } from "@/lib/motion.js";

// Runs Lenis on the GSAP ticker so smooth scrolling and ScrollTrigger share
// one animation frame. Lenis only exists while FULL_MOTION matches; phones,
// tablets and reduced-motion visitors keep native scrolling.
export default function SmoothScroll({ children }) {
  const fullMotion = useMediaQuery(FULL_MOTION);
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    if (!fullMotion) return undefined;

    const instance = new Lenis({ lerp: 0.1 });
    const onTick = (time) => instance.raf(time * 1000);

    instance.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);

    return () => {
      gsap.ticker.remove(onTick);
      gsap.ticker.lagSmoothing(500, 33);
      instance.destroy();
      setLenis(null);
    };
  }, [fullMotion]);

  // Content that loads later (projects, team) changes the page height.
  // Recalculate scroll positions whenever that happens.
  useEffect(() => {
    let timer;
    let lastHeight = document.documentElement.scrollHeight;

    const observer = new ResizeObserver(() => {
      const height = document.documentElement.scrollHeight;
      if (height === lastHeight) return;
      lastHeight = height;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    });

    observer.observe(document.body);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
