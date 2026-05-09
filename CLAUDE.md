# CLAUDE.md

Guidance for Claude Code working in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite, default port 5173)
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm run lint      # ESLint
```

## Architecture

Single-page marketing website. All content lives in `src/App.jsx` — data arrays (`contextItems`, `vorteile`, `phasen`), section layout, and scroll logic. No routing.

### Sections (top to bottom)

1. **Hero** — `ColorBends` WebGL background, headline, sub, two CTAs
2. **Context (`#context`, "Das Problem")** — `HorizontalScroll` with pain-point cards
3. **Lösung (`#dienst`)** — Crawl / Walk / Run phases as 3 cards with connector arrows (desktop horizontal, mobile vertical stack)
4. **Vorteile (`#vorteile`)** — Sticky scroll-progress section, 4 benefit cards reveal as user scrolls
5. **CTA (`#cta`)** — Closing pitch with Typeform link
6. **Footer**

### Styling

- **Tailwind CSS v3** for utility classes
- **Custom CSS** in `src/index.css` for animations, card styling, sticky sections
- Accent color: `#8a95ff`. Available as `text-accent`, `bg-accent`, `border-accent` utilities.
- Two fonts: `Dela Gothic One` (display, class `font-display`) and `Figtree` (body).

### Key components

- **`ColorBends`** ([src/components/ColorBends.jsx](src/components/ColorBends.jsx)) — Three.js/WebGL hero shader animation
- **`HorizontalScroll`** ([src/components/HorizontalScroll.jsx](src/components/HorizontalScroll.jsx)) — Sticky scroll section. JS calculates section height dynamically based on card track width. Used for the "Das Problem" pain-point cards.
- **`ui/`** — Local primitives (`Button`, `Badge`, `Separator`)

### Data shape

```js
// Crawl/Walk/Run phases (App.jsx)
const phasen = [
  { label, title, subtitle, desc, outputs: [string, ...] },
  ...
];
```

### Scroll animations

All scroll logic in `App.jsx`:

- `useReveal()` — IntersectionObserver on `.reveal`, `.reveal-right`, `.reveal-left`; adds `visible` class at 15% threshold
- `vorteileSlowRef` + scroll listener — Progress-based animation. Section is `420vh` tall (`.vorteile-slow`) with sticky inner container; scroll progress 0–1 maps to 4 cards entering at `[0.04, 0.30, 0.56, 0.82]` with green border pulse at `+0.01` offset

### Phase-card layout (`#dienst`)

- **Desktop**: Flex row, 3 `phase-card` items with `phase-connector-h` (horizontal arrow) between each pair
- **Mobile**: Flex column, same cards stacked with `phase-connector-v` (down arrow) between each pair
- Equal-height cards via `items-stretch`; `min-height` on `.phase-desc` keeps "Was du bekommst" labels aligned across cards
- Reveal stagger: `i * 150ms` per card so the cascade is visible

### Positioning reference

The website copy reflects DA Systems' positioning as a **Done-for-you Service for Data & Analytics and KI Implementierung**. Source of truth: `DA Systems Brand/da-systems.md` (outside this repo). Key constraints when writing copy:

- No buzzwords, every word must carry weight
- No em/en dashes (`—`, `–`)
- No antitheses (`X, sondern Y` / `nicht A, sondern B`)
- Short sentences, informative tone
- Don't invent claims not in the positioning doc
