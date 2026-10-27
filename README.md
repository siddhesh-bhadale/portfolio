# Siddhesh Bhadale — Portfolio

Personal portfolio site. React 19, TypeScript, CSS Modules, Vite. No UI
framework, no CSS framework, no animation library — everything here is written
for this site.

**Portfolio URL in both supplied résumés:** https://siddhesh-bhadale.github.io/portfolio/

---

## Getting started

Requires Node.js 20.19+ or 22.12+ (see `.nvmrc`).

```bash
npm install
npm run dev        # dev server, usually http://localhost:5173
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Type-check, then build to `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run typecheck` | Type-check only, no build |

---

## Editing the content

**All copy lives in `src/data/`. You should never need to touch a component to
update the site.**

| File | Holds |
| --- | --- |
| `profile.ts` | Name, headline, intro, about paragraphs, contact details, the four hero metrics |
| `experience.ts` | Jobs, with bullet points and stack per role |
| `projects.ts` | Project case studies — problem, approach, outcome, metrics, stack |
| `openSource.ts` | Open-source contributions, education, languages |
| `skills.ts` | Skill groups and the three proficiency bands |
| `navigation.ts` | Section order for the header, the side rail and the scroll-spy |

Every file is typed against `src/types/index.ts`, so a missing field or a typo
in a level name is a build error rather than something you find out about later.

### Adding a project

Append an object to the array in `src/data/projects.ts`. The `id` must be
unique. `featured` is available for filtering if you later want to split the
list; right now every project renders.

### Changing section order

Reorder `navItems` in `src/data/navigation.ts` **and** reorder the matching
components in `src/App.tsx`. The `id` in `navItems` has to match the `id` passed
to each `<Section>`, or the scroll-spy will not highlight it.

### Replacing the résumé

The Contact section provides two separate **download links**. Recruiters who click a link
receive a PDF whose filename identifies the candidate, target role, and résumé length:

- `Siddhesh_Bhadale_Backend_Platform_Engineer_Resume_2Page.pdf` (detailed)
- `Siddhesh_Bhadale_Backend_Platform_Engineer_Resume_1Page.pdf` (concise)

Both PDFs are stored under `public/`. The names are defined **once** in
`src/data/profile.ts` as `resumeFileNames`. The `profile.resumeHref` and
`profile.conciseResumeHref` URLs reference those names, and the Contact links
explicitly set the HTML `download` attribute to the same names, so a click
saves the file using the expected name rather than the site's URL or a generic
`resume.pdf` name.

To change a filename later, **rename the PDF in `public/` and update its value
in `resumeFileNames`**. The URLs use Vite's `BASE_URL`, which supports GitHub Pages
under `/portfolio/`. The direct PDF link will also have the desired basename.

**Publishing:** Rebuild and redeploy the site before expecting visitors to receive
new filenames; updating a local ZIP does not change the live GitHub Pages site.

---

## Project structure

```
src/
├── components/
│   ├── layout/        Header, Footer, TraceRail, Section wrapper
│   ├── sections/      One folder per page section
│   └── ui/            Reusable pieces (Reveal, Tag, ThemeToggle, …)
├── context/           ThemeContext — light/dark with persistence
├── data/              All site content
├── hooks/             useInView, useActiveSection, useCountUp, …
├── styles/            reset.css, tokens.css, global.css
├── types/             Shared domain types
└── utils/             cn(), formatMetric()
```

Each component folder holds `Component.tsx`, `Component.module.css` and an
`index.ts` barrel, so imports stay short:

```ts
import { Reveal, SectionHeading } from '@/components/ui';
```

`@/` is aliased to `src/` in both `vite.config.ts` and `tsconfig.app.json`.

---

## Styling

Design tokens live in `src/styles/tokens.css` as CSS custom properties. Both
themes are defined there — change a colour once and it updates everywhere,
in both light and dark.

```css
--accent: #0b6b60;      /* the single signal colour */
--relay:  #99763a;      /* only used for the relayed path in the diagram */
--ink:    #111a19;
--bg:     #eef1ef;
```

Everything else is component-scoped CSS Modules. Two rules worth keeping:

1. **Never reuse a class name inside one `.module.css` file.** CSS Modules
   scopes per file, not per rule, so two `.list` rules in the same file merge
   and quietly leak properties across unrelated elements.
2. **Use the tokens, not raw values.** A hard-coded hex will not respond to the
   theme toggle.

Type is Space Grotesk for everything readable and JetBrains Mono for anything
machine-facing — dates, counts, protocol names, diffs. Both load from Google
Fonts in `index.html`; self-host them if you would rather not depend on a CDN.

---

## The connection diagram

`src/components/ui/ConnectionDiagram/` is the animated piece in the hero. It
replays the lifecycle of the peer-to-peer transport: discover → relayed →
hole punch → direct, showing the difference between a relayed and direct connection path. It
does not display made-up benchmark timings.

It is a `<canvas>`, not DOM, because packets move continuously along a path and
a DOM version would animate dozens of elements every frame. Notes if you touch
it:

- Phase timings and captions are the `PHASES` array at the top of the file.
- Colours are read from CSS custom properties at runtime and re-read whenever
  the theme changes, so the canvas stays in step with the rest of the page.
- It pauses when scrolled out of view, and renders a static end state under
  `prefers-reduced-motion`.

---

## Accessibility

- Keyboard reachable throughout, with a visible focus ring and a skip link.
- The accordion uses real `aria-expanded` / `aria-controls` wiring.
- The canvas has a text description, and the same information is repeated in
  the readout underneath it.
- `prefers-reduced-motion` is respected by every animation — reduced motion
  shows the end state rather than nothing.
- Colour is never the only carrier of meaning; skill bands also have a label.

---

## Deploying

The build is a static `dist/` folder — any static host works.

**Netlify / Vercel / Cloudflare Pages** — build command `npm run build`, publish
directory `dist`. For a root-mounted website, set `VITE_BASE_PATH=/` in the build environment.

**GitHub Pages at `siddhesh-bhadale.github.io/portfolio/`** — the default
`base` is already `/portfolio/`. Build and publish `dist/` as GitHub Pages
from your repository, using your existing Pages publishing workflow.

**Root domain or another hosting path** — change the base via an environment
variable, e.g. `VITE_BASE_PATH=/ npm run build` for `username.github.io/`.
Also update canonical/og URLs in `index.html` for the actual published URL.

---

## Before you publish

- [ ] Update the `og:url` and `canonical` URLs in `index.html` to the real domain
- [ ] Add an Open Graph image (`public/og.png`, 1200×630) and reference it in `index.html`
- [ ] Confirm both résumé PDFs in `public/` are the versions you want public
- [ ] Check the GitHub and LinkedIn links in `src/data/profile.ts` resolve
