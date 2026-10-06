import { memo } from "react";

/**
 * ⚡ Bolt: Wrapped in React.memo() to prevent unnecessary re-rendering of this SVG
 * when it is used in lists or frequently re-rendered parent components.
 */
function DirectionArrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false"><path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-7-7 7 7-7 7"} /></svg>;
}

export default memo(DirectionArrow);
