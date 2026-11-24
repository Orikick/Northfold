// Media queries that decide how much motion a visitor gets.
// Keep FULL_MOTION in sync with the full-motion mixin in styles/_mixins.scss.

// Light effects (hero line reveal, counters): everyone except reduced motion.
export const LIGHT_MOTION = "(prefers-reduced-motion: no-preference)";

// Heavy effects (Lenis, pinned horizontal scroll, parallax): desktop only.
export const FULL_MOTION = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
