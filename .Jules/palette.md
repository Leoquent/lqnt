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

## 2026-10-09 - Custom form inputs and progress bar accessibility
**Learning:** This app builds custom multi-step form modals without using native `<form>` wrappers or semantic progress elements, meaning out-of-the-box screen reader support is completely missing for required fields and completion tracking.
**Action:** When building custom interactive components that bypass native HTML semantic patterns, manually add `required` and `aria-required="true"` to mandatory fields, and always use `role="progressbar"` with `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` on visual progress indicators.

## 2024-05-13 - [A11y Support for Custom Forms & Progress Bars]
**Learning:** Custom multi-step forms and visual progress bars often lack native accessibility context. Screen readers cannot deduce that a `div` functions as a progress bar or that specific fields in a custom form flow are mandatory without explicit aria attributes.
**Action:** Always add `role="progressbar"` with `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` to visual progress bars. Annotate mandatory form fields in custom multi-step flows with `required` and `aria-required="true"` to ensure proper screen reader support.

## 2025-02-20 - Custom Modal Forms Accessibility
**Learning:** When building custom UI components that bypass native HTML semantic patterns (like multi-step form modals without `<form>` elements), form validations don't automatically work for screen readers without proper aria attributes. Visual progress bars inside these forms also need semantic roles and values.
**Action:** Manually annotate mandatory fields with `required` and `aria-required="true"`. For visual progress bars, add `role="progressbar"` with `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` for proper screen reader support.

## 2024-10-13 - [Quiz Modal Accessibility]
**Learning:** Custom UI components bypassing native HTML semantic patterns (like multi-step form modals without `<form>` elements) require explicit accessibility annotations for screen readers. This means visual progress bars need `role="progressbar"` with `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`, and custom required fields need explicit `required` and `aria-required="true"`.
**Action:** Always verify proper ARIA attributes on custom UI controls mimicking native forms, ensuring all critical flow steps remain readable and accessible via screen readers.
