## 2024-05-15 - [Screen Reader Support for Custom Multi-Step Forms]
**Learning:** Custom multi-step form modals without native `<form>` elements require manual annotation of mandatory inputs with `required` and `aria-required="true"`. Visual progress bars also need `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` so screen readers can announce them.
**Action:** Always manually add ARIA required attributes to inputs and progress bar roles in custom UI components that bypass native semantic HTML patterns.
