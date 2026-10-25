## 2025-02-23 - Avoid layout thrashing in pointer event handlers
**Learning:** Frequent pointer events that read layout, such as `getBoundingClientRect()`, can trigger repeated layout calculations and reduce performance.
**Action:** Coalesce updates with `requestAnimationFrame` and a pending-frame guard. Capture `clientX`, `clientY`, and `currentTarget` before the asynchronous callback, and group DOM reads before DOM writes.

## 2024-05-24 - React.memo on Presentation Components
**Learning:** The `LqntMark` SVG component and `DirectionArrow` SVG components were being needlessly re-rendered on every scroll frame when the `SiteNav` component updated its boolean states `navScrolled` and `pastHero`. SVG reconciliation is heavy, especially for complex SVGs like LqntMark.
**Action:** Always wrap purely presentational static SVG components in `React.memo()` if they are used within components that hold frequently updating state, like scroll or hover listeners.
