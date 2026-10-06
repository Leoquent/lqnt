## 2024-05-24 - React.memo on Presentation Components
**Learning:** The `LqntMark` SVG component and `DirectionArrow` SVG components were being needlessly re-rendered on every scroll frame when the `SiteNav` component updated its boolean states `navScrolled` and `pastHero`. SVG reconciliation is heavy, especially for complex SVGs like LqntMark.
**Action:** Always wrap purely presentational static SVG components in `React.memo()` if they are used within components that hold frequently updating state, like scroll or hover listeners.
