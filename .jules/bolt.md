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

## 2026-10-07 - Throttling Synchronous Layout Measurements in Scroll Listeners
**Learning:** `getBoundingClientRect` forces a synchronous layout calculation. When placed inside an unthrottled `scroll` listener (which can fire > 60 times a second), it causes layout thrashing and severely impacts main thread performance, particularly when animations (like GSAP pointer tracking) share the thread.
**Action:** Always wrap synchronous DOM measurement calls (`getBoundingClientRect`, `offsetHeight`, etc.) triggered by frequent events (scroll, resize, pointermove) within `requestAnimationFrame` to cap them at the display refresh rate.

## 2024-05-30 - Prevent layout thrashing on high-frequency events
**Learning:** Synchronous DOM measurements (like `getBoundingClientRect()`, `offsetWidth`, `offsetHeight`) inside high-frequency event handlers (`pointermove`, `scroll`, `resize`) block the main thread and can cause significant layout thrashing.
**Action:** Always wrap synchronous layout reads inside a `requestAnimationFrame` when bound to high-frequency events, and use a boolean `ticking` lock mechanism to ensure only one measurement is scheduled per frame.

## 2025-02-18 - Prevent synchronous layout thrashing on high-frequency events using rAF
**Learning:** High-frequency event listeners (like `mousemove`, `pointermove`, `scroll`, `resize`) that read DOM measurements (`getBoundingClientRect`, `offsetWidth`, etc.) and/or write DOM properties can cause severe layout thrashing and block the main thread.
**Action:** Always wrap these measurements and writes in a `requestAnimationFrame` ticking lock. This ensures DOM reads and writes are properly batched by the browser during its rendering pipeline, avoiding main-thread congestion and jank.

## 2024-05-18 - Debounce synchronous getBoundingClientRect on pointer events

**Learning:** When building complex React/GSAP interactive animations where DOM reads (`getBoundingClientRect()`) are triggered by high-frequency pointer and mouse events, doing so synchronously on every event blocks the main thread and introduces severe layout thrashing (jank) especially on non-flagship devices. While React wraps DOM events, executing DOM measurement inside its event listener still forces layout calculation instantly.

**Action:** Always wrap `getBoundingClientRect()` inside a `requestAnimationFrame` and block consecutive calls within the same frame using a `ticking` boolean lock. Additionally, when using React synthetic events, extract the necessary event variables (e.g. `clientX`, `clientY`, `currentTarget`) into scope *before* scheduling the `requestAnimationFrame` block to ensure they remain accessible (and accurate) once the callback executes on the next frame.

## 2026-10-13 - [Debounce Layout Thrashing in requestAnimationFrame]
**Learning:** React synthetic events are pooled/reused. When debouncing DOM reads/writes via `requestAnimationFrame` (like to prevent layout thrashing from `getBoundingClientRect()`), `e.clientX` / `e.currentTarget` etc. must be copied into local variables *before* the async callback. Furthermore, `getBoundingClientRect()` should be grouped *before* any `style` mutations to prevent interleaving reads/writes.
**Action:** Always cache synthetic event properties when debouncing layout changes, and group DOM reads first.

## 2024-05-24 - Layout Thrashing in ResizeObserver Loops
 **Learning:** Iterating over elements and calling getComputedStyle within a .reduce() can cause significant overhead even if it's purely reads, because it slows down JS execution in performance-sensitive callbacks.
 **Action:** Extract getComputedStyle calls outside loops, assuming uniform styling when possible, to avoid repeating DOM styling computations.
