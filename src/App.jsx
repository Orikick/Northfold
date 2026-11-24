import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import Home from "@/pages/Home/Home.jsx";

// The 404 page is rarely needed, so it stays out of the main bundle.
const NotFound = lazy(() => import("@/pages/NotFound/NotFound.jsx"));

export default function App() {
  return (
    <Suspense
      fallback={
        <p className="visually-hidden" role="status">
          Loading page
        </p>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
