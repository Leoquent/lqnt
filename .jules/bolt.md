## 2024-05-30 - Prevent layout thrashing on high-frequency events
**Learning:** Synchronous DOM measurements (like `getBoundingClientRect()`, `offsetWidth`, `offsetHeight`) inside high-frequency event handlers (`pointermove`, `scroll`, `resize`) block the main thread and can cause significant layout thrashing.
**Action:** Always wrap synchronous layout reads inside a `requestAnimationFrame` when bound to high-frequency events, and use a boolean `ticking` lock mechanism to ensure only one measurement is scheduled per frame.
