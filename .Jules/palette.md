## 2024-10-15 - Quiz Modal Accessibility Enhancement
**Learning:** Custom multi-step form modals without a native `<form>` element require manual annotation of progress indicators and mandatory fields to provide an equivalent experience for screen reader users. Visual progress bars should always have `role="progressbar"` with ARIA bounds.
**Action:** Always check custom wizard flows for missing progress bar ARIA roles and ensure mandatory fields bypass `<form>` semantics by manually adding `required` and `aria-required="true"`.

# Palette's UX Journal

## 2024-03-24 - Initial Setup
**Learning:** Initialized the journal to keep track of critical UX and accessibility learnings.
**Action:** Always document surprising user behaviors or specific accessibility patterns here.

## 2024-03-24 - Form Input Accessibility
**Learning:** Custom form step implementations (like the QuizModal) using non-native `<form>` tags need explicit `required` and `aria-required="true"` properties on inputs to ensure screen readers announce them properly.
**Action:** When building custom multi-step forms without native `<form>` elements, always manually annotate mandatory fields for accessibility.

## 2025-02-12 - Missing required attributes on custom multi-step forms
**Learning:** When building custom multi-step forms without native `<form>` elements (like in `QuizModal`), fields visually marked as mandatory must be manually annotated to be accessible. Screen readers will not announce them as required without explicit attributes.
**Action:** Always manually add `required` and `aria-required="true"` to mandatory `<input>` fields in custom form implementations to ensure proper screen reader announcements.

## 2024-05-15 - [Screen Reader Support for Custom Multi-Step Forms]
**Learning:** Custom multi-step form modals without native `<form>` elements require manual annotation of mandatory inputs with `required` and `aria-required="true"`. Visual progress bars also need `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` so screen readers can announce them.
**Action:** Always manually add ARIA required attributes to inputs and progress bar roles in custom UI components that bypass native semantic HTML patterns.
