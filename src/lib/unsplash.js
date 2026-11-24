const BASE = "https://images.unsplash.com";

// Builds an Unsplash CDN URL cropped to the given width and aspect ratio.
// focus is an optional crop hint, for example "faces" for portraits.
export function unsplashUrl(photoId, width, ratio, focus) {
  const height = Math.round(width / ratio);
  const crop = focus ? `&crop=${focus}` : "";
  return `${BASE}/${photoId}?auto=format&fit=crop${crop}&w=${width}&h=${height}&q=70`;
}

export function unsplashSrcSet(photoId, widths, ratio, focus) {
  return widths.map((width) => `${unsplashUrl(photoId, width, ratio, focus)} ${width}w`).join(", ");
}
