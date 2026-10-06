# Palette's UX Journal

## 2024-03-24 - Initial Setup
**Learning:** Initialized the journal to keep track of critical UX and accessibility learnings.
**Action:** Always document surprising user behaviors or specific accessibility patterns here.

## 2024-03-24 - Form Input Accessibility
**Learning:** Custom form step implementations (like the QuizModal) using non-native `<form>` tags need explicit `required` and `aria-required="true"` properties on inputs to ensure screen readers announce them properly.
**Action:** When building custom multi-step forms without native `<form>` elements, always manually annotate mandatory fields for accessibility.
