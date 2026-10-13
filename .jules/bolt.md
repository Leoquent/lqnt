## 2026-10-13 - [Debounce Layout Thrashing in requestAnimationFrame]
**Learning:** React synthetic events are pooled/reused. When debouncing DOM reads/writes via `requestAnimationFrame` (like to prevent layout thrashing from `getBoundingClientRect()`), `e.clientX` / `e.currentTarget` etc. must be copied into local variables *before* the async callback. Furthermore, `getBoundingClientRect()` should be grouped *before* any `style` mutations to prevent interleaving reads/writes.
**Action:** Always cache synthetic event properties when debouncing layout changes, and group DOM reads first.
