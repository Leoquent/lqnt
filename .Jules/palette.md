## 2025-02-12 - Missing required attributes on custom multi-step forms
**Learning:** When building custom multi-step forms without native `<form>` elements (like in `QuizModal`), fields visually marked as mandatory must be manually annotated to be accessible. Screen readers will not announce them as required without explicit attributes.
**Action:** Always manually add `required` and `aria-required="true"` to mandatory `<input>` fields in custom form implementations to ensure proper screen reader announcements.
