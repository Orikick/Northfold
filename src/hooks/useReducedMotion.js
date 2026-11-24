import useMediaQuery from "@/hooks/useMediaQuery.js";
import { REDUCED_MOTION } from "@/lib/motion.js";

// True when the visitor has asked their system for less motion.
export default function useReducedMotion() {
  return useMediaQuery(REDUCED_MOTION);
}
