// Data access layer. Content is bundled as JSON and loaded on demand, so
// every consumer already handles loading, empty and error states. To use a
// real API later, swap the bodies of these functions for fetch() calls.

// Add ?demo=loading, ?demo=empty or ?demo=error to the URL to preview a state.
function demoState() {
  return new URLSearchParams(window.location.search).get("demo");
}

function withDemoState(load) {
  return () => {
    const demo = demoState();
    if (demo === "loading") return new Promise(() => {});
    if (demo === "empty") return Promise.resolve([]);
    if (demo === "error") return Promise.reject(new Error("Demo error state"));
    return load();
  };
}

export const loadProjects = withDemoState(() =>
  import("@/data/projects.json").then((module) => module.default),
);

export const loadTeam = withDemoState(() =>
  import("@/data/team.json").then((module) => module.default),
);

// Simulated submission: there is no backend. Replace with
// fetch("/api/enquiries", { method: "POST", body: JSON.stringify(enquiry) }).
export function submitEnquiry(enquiry) {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (!navigator.onLine || demoState() === "error") {
        reject(new Error("The enquiry could not be sent."));
        return;
      }
      resolve({ ok: true, enquiry });
    }, 900);
  });
}
