## 2025-02-18 - Prevent synchronous layout thrashing on high-frequency events using rAF
**Learning:** High-frequency event listeners (like `mousemove`, `pointermove`, `scroll`, `resize`) that read DOM measurements (`getBoundingClientRect`, `offsetWidth`, etc.) and/or write DOM properties can cause severe layout thrashing and block the main thread.
**Action:** Always wrap these measurements and writes in a `requestAnimationFrame` ticking lock. This ensures DOM reads and writes are properly batched by the browser during its rendering pipeline, avoiding main-thread congestion and jank.
