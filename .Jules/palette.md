## 2024-10-15 - Quiz Modal Accessibility Enhancement
**Learning:** Custom multi-step form modals without a native `<form>` element require manual annotation of progress indicators and mandatory fields to provide an equivalent experience for screen reader users. Visual progress bars should always have `role="progressbar"` with ARIA bounds.
**Action:** Always check custom wizard flows for missing progress bar ARIA roles and ensure mandatory fields bypass `<form>` semantics by manually adding `required` and `aria-required="true"`.
