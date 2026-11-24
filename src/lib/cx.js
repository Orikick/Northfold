// Joins class names, skipping falsy values: cx("a", cond && "b").
export default function cx(...names) {
  return names.filter(Boolean).join(" ");
}
