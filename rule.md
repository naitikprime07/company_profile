# React Project Rules — Company Profile Website

These rules are **mandatory** and apply to every piece of code generated for this project. Any code that violates a rule below must be rewritten before it is considered complete.

---

## 1. Project Structure

Use a feature-based, scalable folder structure. Never dump unrelated files into one folder.

```
src/
├── assets/            # Images, fonts, icons, static media
├── components/
│   ├── common/         # Generic reusable UI (Button, Card, Modal, Input...)
│   ├── layout/          # Header, Footer, Navbar, Sidebar, PageWrapper
│   └── sections/         # Page-specific composite sections (Hero, Services, Team...)
├── pages/               # Route-level components (Home, About, Contact, Services)
├── hooks/               # Custom reusable hooks (useFetch, useForm, useScrollPosition)
├── context/             # React Context providers/consumers
├── services/            # API calls, external integrations
├── utils/               # Pure helper/utility functions
├── constants/           # Static data, enums, config values
├── styles/              # Global styles, variables, mixins
├── routes/              # Route definitions
└── App.jsx
```

**Rules:**
- One component = one file = one folder (if it has related styles/tests):
  `components/common/Button/Button.jsx`, `Button.module.css`, `index.js`
- No file should exceed ~200–250 lines. If it grows larger, split it.
- No business logic inside `pages/` — pages only compose components.
- Barrel files (`index.js`) are used to simplify imports, but must not create circular dependencies.

---

## 2. Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Component files/folders | PascalCase | `ServiceCard.jsx` |
| Hooks | camelCase, prefixed `use` | `useOnScreen.js` |
| Utility functions | camelCase | `formatDate.js` |
| Constants | UPPER_SNAKE_CASE | `MAX_ITEMS_PER_PAGE` |
| CSS Modules classes | camelCase | `.cardTitle` |
| Context files | PascalCase + `Context` suffix | `ThemeContext.jsx` |
| Props/variables | camelCase, descriptive, no abbreviations | `isLoading`, not `ld` |

Boolean variables/props must read as a question: `isVisible`, `hasError`, `canSubmit`.

---

## 3. Component Rules (Single Responsibility)

- Every component does **one thing**. If a component fetches data, renders UI, *and* manages complex state, split it into a container (logic) + presentational (UI) component, or extract logic into a custom hook.
- Prefer **function components** with Hooks. No class components.
- Keep components **pure** where possible — same props in, same UI out.
- Extract repeated JSX (3+ occurrences, or 2+ if non-trivial) into a reusable component immediately. Never copy-paste a block of JSX.
- Extract repeated logic (validation, formatting, API calls) into `utils/` or a custom hook — never duplicate a function across files.
- Before writing a new component/function, check whether an equivalent already exists in `components/common/`, `hooks/`, or `utils/` and reuse/extend it instead of recreating it.
- Props should be destructured in the function signature, with default values where sensible.
- Define PropTypes (or TypeScript types/interfaces if the project uses TS) for every component's props.

```jsx
// Good
function ServiceCard({ title, description, icon, onClick = () => {} }) {
  return (
    <article className={styles.card} onClick={onClick}>
      <img src={icon} alt="" aria-hidden="true" />
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default ServiceCard;
```

---

## 4. Hooks — Correct & Efficient Usage

- Follow the **Rules of Hooks**: only call at the top level, only from React functions, never inside loops/conditions/nested functions.
- Use `useState` for local UI state; lift state up only when genuinely shared between siblings.
- Use `useEffect` with a **complete and correct dependency array**. No suppressing ESLint's `exhaustive-deps` warning without a documented reason.
- Clean up side effects (event listeners, subscriptions, timers) in the `useEffect` return function.
- Extract any non-trivial or reused stateful logic into a **custom hook** (`useFetch`, `useDebounce`, `useMediaQuery`, `useIntersectionObserver`, etc.) rather than duplicating it in multiple components.
- Prefer `useReducer` over multiple related `useState` calls when state transitions are complex/interdependent.

---

## 5. Performance Optimization

- Wrap presentational components that re-render often with unchanged props in **`React.memo`**.
- Use **`useMemo`** to memoize expensive computations or derived data — not for trivial calculations.
- Use **`useCallback`** for functions passed as props to memoized child components, or used as `useEffect` dependencies.
- **Lazy-load routes and heavy components** with `React.lazy` + `Suspense`:
  ```jsx
  const About = lazy(() => import('../pages/About'));
  ```
- Use **code-splitting** at the route level at minimum.
- Optimize images: use modern formats (WebP/AVIF), proper `width`/`height` attributes, and `loading="lazy"` for below-the-fold images.
- Avoid inline object/array/function literals passed as props unless necessary — they break memoization by creating new references every render.
- Avoid unnecessary state — derive values during render instead of storing them in state when possible.
- Always provide a stable, unique `key` (not array index, unless the list is static and never reordered) when rendering lists.
- Debounce/throttle expensive event handlers (scroll, resize, input).
- Keep the component tree shallow where reasonable; avoid prop drilling more than 2–3 levels — use Context or state management instead.

---

## 6. No Duplicate Code

- Before generating new code, check existing `common/`, `hooks/`, `utils/`, and `constants/` for something reusable.
- Shared UI (buttons, cards, modals, form inputs, section headings, containers) must live in `components/common/` and be imported everywhere — never redefined per page.
- Shared constants (nav links, social links, contact info, company data) live in `constants/` as a single source of truth.
- Repeated styling patterns go into shared CSS variables/mixins or a shared style utility — not repeated inline styles.

---

## 7. Clean, Readable Code

- Use modern ES6+ syntax: arrow functions, destructuring, template literals, spread/rest operators, optional chaining (`?.`), nullish coalescing (`??`), default parameters.
- Use meaningful, descriptive names — no `data2`, `temp`, `foo`.
- Add concise comments explaining **why**, not what (the code should already show what), especially for non-obvious logic.
- Add a short JSDoc block above custom hooks and non-trivial utility functions:
  ```js
  /**
   * Debounces a value by the given delay.
   * @param {*} value - value to debounce
   * @param {number} delay - delay in ms
   * @returns {*} debounced value
   */
  ```
- Keep functions short and focused; if a function needs a comment to explain "step 1, step 2, step 3," it should probably be split.
- Consistent formatting via Prettier + ESLint (Airbnb or React recommended config) is assumed — no inconsistent indentation, quote style, or spacing.

---

## 8. Responsive & Cross-Browser UI

- Mobile-first CSS: base styles for mobile, then `min-width` media queries for larger screens.
- Use relative units (`rem`, `em`, `%`, `vw/vh`, `clamp()`) over fixed `px` where layout should scale.
- Use CSS Flexbox/Grid for layout — no float-based layouts.
- Test breakpoints at minimum: mobile (≤480px), tablet (≤768px), laptop (≤1024px), desktop (≥1280px).
- Avoid browser-specific CSS without vendor prefixes/fallbacks where needed; avoid features with poor cross-browser support without a fallback.
- Touch targets on mobile must be at least 44×44px.

---

## 9. Accessibility (a11y)

- Use **semantic HTML** first: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<button>` — not `<div onClick>`.
- Every image has meaningful `alt` text (or `alt=""` if purely decorative).
- All interactive elements must be keyboard-operable (focusable, usable with Enter/Space) and show a visible focus state.
- Use ARIA attributes only when semantic HTML isn't sufficient (`aria-label`, `aria-expanded`, `aria-hidden`, `role`) — don't overuse ARIA.
- Forms: every input has an associated `<label>`, proper `name`/`id`, and clear error messaging tied via `aria-describedby`.
- Maintain sufficient color contrast (WCAG AA minimum, 4.5:1 for body text).
- Respect logical heading hierarchy (`h1` → `h2` → `h3`, no skipped levels).
- Animations should respect `prefers-reduced-motion`.

---

## 10. Color Theme & Design System (Blue Palette)

The website's primary color theme is **blue**. Every generated component or page must follow this palette consistently — no random or ad-hoc colors unless explicitly instructed otherwise.

- Define the palette once as CSS custom properties (or theme tokens) in `styles/` and reference them everywhere — never hardcode hex values inside components.
  ```css
  :root {
    --color-primary: #1E40AF;      /* primary blue — buttons, links, key highlights */
    --color-primary-dark: #1E3A8A;  /* hover/active states */
    --color-primary-light: #3B82F6; /* accents, icons, secondary highlights */
    --color-primary-bg: #EFF6FF;    /* light blue backgrounds/sections */
    --color-secondary: #0F172A;     /* dark neutral for text/headings */
    --color-neutral: #64748B;       /* body text, muted content */
    --color-surface: #FFFFFF;       /* cards, surfaces */
    --color-border: #CBD5E1;        /* borders, dividers */
    --color-success: #16A34A;
    --color-error: #DC2626;
    --color-warning: #D97706;
  }
  ```
- **Buttons, links, active states, icons, highlights, and other primary UI elements** must use the blue palette (`--color-primary` / `--color-primary-dark` / `--color-primary-light`) consistently across all pages.
- Neutral colors (white, gray, near-black) are used for backgrounds, text, and surfaces to keep the design clean and professional — blue is the accent/brand color, not applied to every element.
- Status colors (success/error/warning) are the only exception to the blue rule, and are used solely for their semantic purpose (form validation, alerts).
- Hover, focus, and active states use a darker or lighter shade of the same blue (e.g., `--color-primary-dark`), never an unrelated color.
- Do not introduce a new color anywhere (buttons, backgrounds, borders, gradients, icons) without adding it to the shared theme tokens first — no inline one-off hex codes.
- Gradients, shadows, and accents, if used, must stay within the blue/neutral family unless the user explicitly requests otherwise.
- This palette must be applied consistently from the first component onward — every new component or page is checked against the theme tokens above, not just visually "similar" colors.

---

## 11. State & Data Management

- Keep state as local as possible; only elevate to Context/global store when multiple distant components need it.
- Don't overuse Context for frequently-changing values (causes broad re-renders) — split contexts by concern (e.g., `ThemeContext`, `AuthContext`) rather than one giant context.
- API calls live in `services/`, never directly inside components. Components call a hook (e.g., `useContactForm`) which calls the service.

---

## 12. Definition of Done (checklist for every generated component/feature)

- [ ] No duplicate logic or markup — reused existing components/hooks/utils where possible
- [ ] Single responsibility respected
- [ ] Proper folder placement and naming convention followed
- [ ] Props typed/validated
- [ ] Hooks used correctly with full dependency arrays
- [ ] Memoization applied where it meaningfully prevents re-renders
- [ ] Responsive across breakpoints
- [ ] Semantic HTML + accessible (keyboard + screen reader friendly)
- [ ] Uses the shared blue theme tokens — no hardcoded or off-palette colors
- [ ] No console errors/warnings
- [ ] Code is commented where necessary and consistently formatted

---

## 13. Hard "Never Do" List

- Never use class components.
- Never mutate state or props directly.
- Never use array index as a `key` for dynamic/reorderable lists.
- Never inline large chunks of duplicated JSX/logic instead of extracting a component/hook.
- Never fetch data directly inside a component body without `useEffect`/a hook.
- Never leave `console.log` statements in production code.
- Never use inline styles as the primary styling method (use CSS Modules/styled-components/Tailwind consistently — pick one approach and stick to it project-wide).
- Never skip `alt` attributes or accessible labels.
- Never introduce a new UI pattern for something a reusable component already handles.
- Never use a random or off-palette color for buttons, links, icons, or highlights — always use the shared blue theme tokens, unless explicitly instructed otherwise.