import { useCallback, useEffect, useState } from "react";

// Runs an async loader and reports one of four states:
// "loading" | "success" | "empty" | "error". Call retry() to run it again.
// The loader must be a stable function (defined outside the component).
export default function useAsyncData(loader) {
  const [state, setState] = useState({ status: "loading", data: null, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    setState({ status: "loading", data: null, error: null });

    loader()
      .then((data) => {
        if (!active) return;
        const isEmpty = Array.isArray(data) && data.length === 0;
        setState({ status: isEmpty ? "empty" : "success", data, error: null });
      })
      .catch((error) => {
        if (active) setState({ status: "error", data: null, error });
      });

    return () => {
      active = false;
    };
  }, [loader, attempt]);

  const retry = useCallback(() => setAttempt((count) => count + 1), []);

  return { ...state, retry };
}
