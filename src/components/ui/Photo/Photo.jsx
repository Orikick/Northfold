import { useState } from "react";
import { unsplashSrcSet, unsplashUrl } from "@/lib/unsplash.js";
import cx from "@/lib/cx.js";
import styles from "./Photo.module.scss";

const DEFAULT_WIDTHS = [480, 768, 1080, 1600];

// Responsive Unsplash image in a fixed-ratio frame, so nothing shifts while
// it loads. Shows a neutral placeholder if the image fails.
//
// ratio      layout ratio of the frame (omit to let CSS set --photo-ratio)
// cropRatio  ratio requested from the CDN (defaults to ratio)
// focus      crop hint for the CDN, e.g. "faces" for portraits
// priority   load eagerly with high priority (above-the-fold images only)
export default function Photo({
  photoId,
  alt,
  ratio,
  cropRatio,
  focus,
  sizes = "100vw",
  widths = DEFAULT_WIDTHS,
  priority = false,
  parallax = false,
  className,
  imgClassName,
  imgRef,
}) {
  const [failed, setFailed] = useState(false);
  const crop = cropRatio ?? ratio ?? 4 / 3;
  const style = ratio ? { "--photo-ratio": ratio } : undefined;

  if (failed) {
    return (
      <div className={cx(styles.frame, styles.fallback, className)} style={style} role="img" aria-label={alt}>
        <span aria-hidden="true">Photo unavailable</span>
      </div>
    );
  }

  const largest = widths[widths.length - 1];

  return (
    <div className={cx(styles.frame, className)} style={style}>
      <img
        ref={imgRef}
        className={cx(styles.img, parallax && styles.parallax, imgClassName)}
        src={unsplashUrl(photoId, widths[1] ?? largest, crop, focus)}
        srcSet={unsplashSrcSet(photoId, widths, crop, focus)}
        sizes={sizes}
        alt={alt}
        width={largest}
        height={Math.round(largest / crop)}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
