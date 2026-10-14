## 2026-10-14 - Progress Bar and Native Validation

**Learning:** When using native HTML5 validation attributes like `required`, `aria-required="true"` is redundant as the semantics are implicitly handled by the browser for screen readers. In contrast, custom visual elements acting as progress bars *must* explicitly use `role="progressbar"` and `aria-value*` attributes because they lack native semantic meaning.
**Action:** Only use `aria-required` when building fully custom non-native form controls; rely on native `required` for standard `<input>` elements. Always use explicit roles and `aria-value*` on custom visual progress indicators.
