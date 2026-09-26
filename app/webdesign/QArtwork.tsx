import s from "./hero-scene.module.css";

/** Standalone illustration: ring and tail copied from LqntMark's second path. */
export default function QArtwork({ variant }: { variant: "intro" | "design" }) {
  return <svg className={s.qArtwork} data-q={variant} viewBox="942 160 682 913" fill="currentColor" aria-hidden="true" focusable="false">
    <g data-q-turn>
      <path d="M 1538.03 731.50 A 255.33 255.33 0 1 1 1027.37 731.50 A 255.33 255.33 0 1 1 1538.03 731.50 Z M 1406.03 731.50 A 123.33 123.33 0 1 0 1159.37 731.50 A 123.33 123.33 0 1 0 1406.03 731.50 Z" />
      <path data-q-tail d="M 1265.02 798.67 L 1349.88 713.82 L 1555.03 918.97 L 1470.18 1003.83 Z" />
    </g>
  </svg>;
}
