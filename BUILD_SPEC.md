# Build Spec — Political Compass Test Platform

Drop this at the repo root. It's the brief for the whole build.

---

## 1. What this is

A multi-test platform. Each test asks ~50 statements, scores the answers on two
independent axes, and plots the user in a 3×3 grid of named archetypes. The
result is shareable as a link, a social image, and a downloadable PDF
certificate.

**v1 ships one test only: the political test.** The engine must be generic so
that adding test #2 is writing a JSON file, not building a feature.

Planned later: attachment style, moral foundations, interpersonal/social,
career.

---

## 2. Stack

| Concern | Choice |
|---|---|
| Framework | Next.js (App Router), TypeScript |
| Styling | Tailwind |
| Hosting | Self-hosted on VPS (Nginx reverse proxy) |
| Scoring | 100% client-side |
| Database | **None in v1.** Results live in the URL. |
| PDF + share images | Playwright (headless Chromium) in a small Node route |
| i18n | next-intl |

### Why no database

A result is fully described by two numbers. Putting them in the URL makes every
result shareable, cacheable, and bookmarkable with zero infrastructure. Only add
Postgres when you want percentile stats ("more libertarian than 68% of
takers") — and that needs a privacy policy first.

### Why Playwright and not @react-pdf/renderer

The certificate must render in the user's chosen language, and that list will
include Arabic. `@react-pdf/renderer` does not shape Arabic correctly —
letters come out disconnected. Chromium does. Non-negotiable.

---

## 3. Routes

```
/[locale]                        landing
/[locale]/test/[testId]          the question flow
/[locale]/r/[testId]             result   ?x=-0.42&y=-0.31&v=1
/[locale]/about | /privacy | /method
/api/og/[testId]                 share image  (satori or Playwright)
/api/pdf/[testId]                certificate  (Playwright)
```

`v` is the test config version. **Never drop it.** When questions get reworded,
old shared links must still render the score they were generated with.

---

## 4. Test config format

One JSON file per test in `/config/tests/`. `political.json` already exists.

```ts
type TestConfig = {
  id: string;
  version: number;
  scale: { type: "likert5"; values: { key: string; value: -2|-1|0|1|2 }[] };
  axes: {
    x: { id: string; negative_label_key: string; positive_label_key: string; max_raw: number };
    y: { ... };
  };
  scoring: { gain: number; clamp: number };
  cells: Cell[];        // 9, row-major from top-left
  questions: { id: string; text_key: string; w: { [axisId]: number } }[];
};
```

### Invariants — enforce these in a test that runs in CI

1. **Weights must sum to 0 on each axis.** This kills acquiescence bias: a
   person who agrees with everything must land dead centre, not pushed to one
   side. Already true of `political.json`.
2. `max_raw` per axis = `sum(abs(weight)) * 2`. Recompute on every weight edit.
   Political: econ 104, social 124.
3. Cross-loaded questions must be spread across all four diagonals. If they
   cluster, results pile onto one diagonal and half the grid stays empty.

---

## 5. Scoring

```ts
const raw = (axis) => sum(answer[i] * q[i].w[axis]);          // answer ∈ -2..2
const x   = clamp(raw("econ")   / max.econ   * gain, -1, 1);
const y   = clamp(raw("social") / max.social * gain, -1, 1);
```

`gain = 0.9`. Calibrated by simulation: at 1.7 about 62% of respondents clamped
to the edge and every result read as "extreme". At 0.9 almost nobody clamps.
**Retune once real pilot data exists** — simulated respondents spread wider than
real ones, so it may need to come up slightly.

### Cell assignment

`BAND = 0.33`. Column: `x < -BAND ? 0 : x > BAND ? 2 : 1`.
Row: `y > BAND ? 0 : y < -BAND ? 2 : 1`.

`BAND` and `gain` interact — when tuning, change one at a time.

|  | Left | Centre | Right |
|---|---|---|---|
| **Authoritarian** | Collectivist | Guardian | Traditionalist |
| **Centre** | Egalitarian | Moderate | Marketeer |
| **Libertarian** | Communalist | Individualist | Libertarian |

---

## 6. Design

Instrument-panel direction — a measuring device, not a chart.

```css
--bg:        #0A101C;
--face:      #111C2E;
--brass:     #C9A961;   /* engraving, active state, the result dot */
--brass-dim: #6E5B31;
--ink:       #E8E4DA;
--ink-dim:   #8A93A6;
--auth-left:  #B04A4A;  --auth-right: #3E6FA8;
--lib-left:   #4E8F63;  --lib-right:  #7B5EA7;
```

- Display / axis labels: Palatino-family serif, wide letter-spacing
- Data, readouts, cell names: monospace
- The plot field is **four corner radial gradients**, not four flat quadrants —
  a hard seam at zero would fight the grid lines at ±0.33
- The compass rose is the **brand mark only**: logo, certificate seal, 5%
  watermark behind the plot. It is not the result visual.

### Result animation

Vertical guide slides to x → horizontal guide slides to y → dot lands at the
intersection → cell illuminates. ~1.7s. This teaches the reader how to read the
chart, which is the whole reason the grid beat the compass. Respect
`prefers-reduced-motion`.

### Question flow

One statement per screen. 5-point scale, neutral in the middle but visually
de-emphasised. Keyboard 1–5. Progress bar. Back button. Persist answers to
`sessionStorage` so a refresh doesn't wipe 50 answers.

---

## 7. Share and export

- **OG image** 1200×630, **square** 1080×1080, **story** 1080×1920
- Generated from x, y, locale — cache 24h keyed by a hash of those
- PDF: A4 (595×842pt), same component as the web result, printed by Chromium
- Build the certificate with CSS **logical properties**
  (`margin-inline-start`, never `margin-left`) so RTL mirrors for free

---

## 8. i18n

- Locale in the path: `/en`, `/fr`, `/ar`
- Question text moves out of the JSON into locale files keyed by `text_key`
- Self-host and subset fonts per script; never fetch Google Fonts at render time
- **Do not machine-translate the statements.** Translation flattens the lean a
  statement was engineered to have, and scores drift by language. Native review
  per locale.

---

## 9. Legal — do this before launch, not after

- Every question, weight, sector name and illustration is **original**. Do not
  copy politicalcompass.org's propositions — they're copyrighted and their
  weights were never published anyway.
- Reference figures on the grid need a **stated method and a source per
  figure**, published on `/method`. Sample data currently uses PARTY A/B/C
  placeholders — do not ship invented coordinates for real people.
- Worldwide traffic means EU traffic: cookie consent + privacy policy if you run
  analytics or ads.

---

## 10. Already done

| File | State |
|---|---|
| `political.json` | 50 questions, balanced, validated. Ready. |
| `ResultGrid.jsx` | Result visual + animation. Port to TS, extract the demo harness. |

## 11. Still open

- Nine cell descriptions (~120 words each) × locales
- Reference figure placements + sources
- i18n extraction of question text
- Landing page copy
- Domain (`Azimuthly.com` available; `compasspin.com`, `talentscompass.com` found)

---

## 12. Build order

1. Scaffold Next.js + Tailwind + next-intl, one locale (`en`)
2. Config loader + scoring module + **the CI test asserting the invariants in §4**
3. Question flow UI, sessionStorage persistence
4. Result page — port `ResultGrid`, read x/y from URL
5. OG image route, verify previews on WhatsApp / X / iMessage
6. PDF route with Playwright
7. Add `fr`, then `ar` — fix RTL at this point, not later
8. Landing, /method, /privacy
9. Pilot: 50–100 real responses → retune `gain` and `BAND`

Ship after step 6 if you need to. Steps 1–6 are a complete product.
