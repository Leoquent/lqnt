## 2025-02-23 - Avoid layout thrashing in pointer event handlers
**Learning:** Frequent pointer events that read layout, such as `getBoundingClientRect()`, can trigger repeated layout calculations and reduce performance.
**Action:** Coalesce updates with `requestAnimationFrame` and a pending-frame guard. Capture `clientX`, `clientY`, and `currentTarget` before the asynchronous callback, and group DOM reads before DOM writes.

## 2024-05-24 - React.memo on Presentation Components
**Learning:** The `LqntMark` SVG component and `DirectionArrow` SVG components were being needlessly re-rendered on every scroll frame when the `SiteNav` component updated its boolean states `navScrolled` and `pastHero`. SVG reconciliation is heavy, especially for complex SVGs like LqntMark.
**Action:** Always wrap purely presentational static SVG components in `React.memo()` if they are used within components that hold frequently updating state, like scroll or hover listeners.

## 2026-10-03 - Optimizing Layout Thrashing in Interactive Canvas/GSAP Hover Effects
**Learning:** High-frequency mouse interactions (like GSAP's `quickTo` or canvas particle tracking in `PricingCards.tsx` and `CopyStatement.tsx`) were using `getBoundingClientRect()` inside the `pointermove` handler. This caused continuous forced synchronous layouts (layout thrashing) on every mouse movement, significantly hurting performance on lower-end devices.
**Action:** Instead of measuring bounds on every frame or move, measure document-relative coordinates (`rect.top + window.scrollY`, `rect.left + window.scrollX`) inside `resize` and `pointerenter` events. Inside the `pointermove` handler, rely on the document-relative `event.pageX` and `event.pageY` to compute the mouse offset without triggering layout calculations. This completely eliminates the need for expensive calculations and continuous scroll listeners for maintaining bounding box references.

## 2024-05-15 - Prevent layout thrashing on frequent events
**Learning:** Calling synchronous DOM measurement methods like `getBoundingClientRect`, `offsetHeight`, or `getComputedStyle` inside high-frequency event handlers (`scroll`, `resize`, `pointermove`) or `ResizeObserver` callbacks blocks the main thread and causes severe layout thrashing (synchronous layout recalculations).
**Action:** Always wrap these measurement calls inside a `requestAnimationFrame` using a boolean `ticking` lock to ensure layout calculations are batched and deferred to the next render frame. Extract required event properties (like `event.clientX`) synchronously *before* the rAF callback.
