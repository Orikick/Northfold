import Photo from "@/components/ui/Photo/Photo.jsx";
import styles from "./ProjectCard.module.scss";

// One project in the horizontal track. On hover the photo lifts off a
// coloured block and zooms slightly, and the title underline draws in.
// Nothing is hidden until hover, so touch and keyboard users miss nothing.
export default function ProjectCard({ project }) {
  const { title, discipline, year, summary, result, photo, alt, ratio } = project;

  return (
    <article className={styles.card} style={{ "--ratio": ratio }}>
      <div className={styles.media}>
        <Photo
          photoId={photo}
          alt={alt}
          cropRatio={ratio}
          widths={[480, 768, 1080]}
          sizes="(min-width: 1024px) 45vw, (min-width: 768px) 24rem, 78vw"
          className={styles.frame}
          imgClassName={styles.photo}
        />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.meta}>
        {discipline}, {year}
      </p>
      <p className={styles.summary}>{summary}</p>
      <p className={styles.result}>
        <span className="visually-hidden">Result: </span>
        {result}
      </p>
    </article>
  );
}
