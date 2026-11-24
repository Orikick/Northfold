import { useRef } from "react";
import ProjectCard from "@/components/ui/ProjectCard/ProjectCard.jsx";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading.jsx";
import Skeleton from "@/components/ui/Skeleton/Skeleton.jsx";
import StatusMessage from "@/components/ui/StatusMessage/StatusMessage.jsx";
import useAsyncData from "@/hooks/useAsyncData.js";
import useMediaQuery from "@/hooks/useMediaQuery.js";
import { loadProjects } from "@/data/api.js";
import { contact } from "@/data/navigation.js";
import { gsap, useGSAP } from "@/lib/gsap.js";
import { FULL_MOTION } from "@/lib/motion.js";
import styles from "./Projects.module.scss";

function headerOffset() {
  return document.querySelector("[data-site-header]")?.offsetHeight ?? 0;
}

// Desktop with motion allowed: the section pins under the header and
// vertical scrolling moves the track sideways.
// Everything else: the track is a native, swipeable, keyboard-scrollable row.
export default function Projects() {
  const { status, data, retry } = useAsyncData(loadProjects);
  const fullMotion = useMediaQuery(FULL_MOTION);
  const pinRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);

  useGSAP(
    () => {
      if (status !== "success") return undefined;
      const mm = gsap.matchMedia();

      mm.add(FULL_MOTION, () => {
        const viewport = viewportRef.current;
        const track = trackRef.current;
        const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

        // Undo any native scrolling done before the pinned mode took over.
        viewport.scrollLeft = 0;

        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: pinRef.current,
              start: () => `top top+=${headerOffset()}`,
              end: () => `+=${distance()}`,
              pin: true,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              // Measure this pin before triggers further down the page.
              refreshPriority: 1,
            },
          })
          .to(track, { x: () => -distance() }, 0)
          .fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1 }, 0);
      });

      return () => mm.revert();
    },
    { dependencies: [status], revertOnUpdate: true },
  );

  return (
    <section id="work" className={styles.section} aria-labelledby="work-title" tabIndex={-1}>
      <div ref={pinRef} className={styles.pin}>
        <div className={styles.head}>
          <SectionHeading id="work-title" title="Selected projects" compact>
            Recent work, each project measured against the one number the client cared about most.
          </SectionHeading>
        </div>

        {status === "loading" && (
          <div className={styles.viewport} role="status" aria-busy="true">
            <p className="visually-hidden">Loading projects</p>
            <div className={styles.track}>
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className={styles.placeholder}>
                  <Skeleton className={styles.placeholderMedia} />
                  <Skeleton className={styles.placeholderLine} />
                  <Skeleton className={styles.placeholderLine} style={{ width: "60%" }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {status === "error" && (
          <div className={styles.head}>
            <StatusMessage
              variant="error"
              tone="dark"
              title="Projects didn't load"
              actionLabel="Try again"
              onAction={retry}
            >
              Check your connection, then try again.
            </StatusMessage>
          </div>
        )}

        {status === "empty" && (
          <div className={styles.head}>
            <StatusMessage tone="dark" title="No projects published yet">
              New case studies go up every quarter. For recent work, email {contact.email}.
            </StatusMessage>
          </div>
        )}

        {status === "success" && (
          <>
            <div
              ref={viewportRef}
              className={styles.viewport}
              role={fullMotion ? undefined : "region"}
              aria-label={fullMotion ? undefined : "Selected projects, scroll sideways for more"}
              tabIndex={fullMotion ? undefined : 0}
            >
              <ul ref={trackRef} className={styles.track}>
                {data.map((project) => (
                  <li key={project.id} className={styles.item}>
                    <ProjectCard project={project} />
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.progress} aria-hidden="true">
              <span ref={barRef} className={styles.bar} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
