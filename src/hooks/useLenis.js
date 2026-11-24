import { createContext, useContext } from "react";

// Holds the active Lenis instance, or null when smooth scrolling is off
// (mobile, tablets and prefers-reduced-motion).
export const LenisContext = createContext(null);

export default function useLenis() {
  return useContext(LenisContext);
}
