# Implementation Plan: Music Playlists Section (Revised)

**Branch**: `004-music-playlists` | **Date**: 2026-03-12 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-music-playlists/spec.md` — revised UX: card-based playlist browsing + inline accordion song reveal

## Summary

Redesign the Music page (already built) to replace the inline scrolling layout with a card-based browser. The page shows compact playlist cards (name, description, song count, optional cover image). Clicking a card opens that playlist's songs inline — with Spotify embeds — directly below the card grid. Only one playlist is open at a time. The existing navigation changes (Podcasts → Music) and data file (`data/music.js`) are already in place. This plan focuses on the UX redesign of the page itself.

## Technical Context

**Language/Version**: JavaScript (ESM) — Node.js via Next.js
**Primary Dependencies**: Next.js 16, React 19, Tailwind CSS 4, Framer Motion 12 (existing stack)
**Storage**: N/A — static JS data file (`data/music.js`), updated to add optional `image` field per playlist
**Testing**: None (per Constitution Principle IV — lightweight testing; no test framework currently used for UI components)
**Target Platform**: Static export → Vercel (Next.js App Router)
**Project Type**: Personal portfolio web application
**Performance Goals**: Page cards load instantly; Spotify embeds for open playlist use `loading="lazy"` to prevent blocking
**Constraints**: Must remain statically exportable; no server runtime. No new npm packages.
**Scale/Scope**: Single page, ~2–6 playlists, ~3–10 songs each

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                | Status  | Notes                                                                                                    |
| ------------------------ | ------- | -------------------------------------------------------------------------------------------------------- |
| I. Visual Consistency    | ✅ PASS | Card design follows FeaturedArticle.js pattern (HoverAnimation, grayscale image, text-primary/secondary) |
| II. Personal Showcase    | ✅ PASS | Music taste + curated playlist cards express personal identity                                           |
| III. Dark Mode First     | ✅ PASS | No new colors; all styling uses existing dark-mode-first tokens and color maps                           |
| IV. Lightweight Testing  | ✅ PASS | No new test infrastructure; manual visual verification sufficient                                        |
| V. Dependency Discipline | ✅ PASS | No new npm packages; FeaturedArticle pattern reused without new deps                                     |
| Deployment Standards     | ✅ PASS | No server functions, edge runtime, or DB; remains statically exportable                                  |
| Code Quality Standards   | ✅ PASS | ESLint + Prettier to run before merge; no `any` types (JS project)                                       |

**Post-Design Re-check**: All gates still pass. `PlaylistBrowser` is a standard `'use client'` React component using only existing APIs (`useState`). The card design reuses `HoverAnimation` exactly as `FeaturedArticle.js` does.

## Project Structure

### Documentation (this feature)

```text
specs/004-music-playlists/
├── plan.md              ✅ This file (updated)
├── research.md          ✅ Phase 0 output (updated)
├── data-model.md        ✅ Phase 1 output (updated)
├── quickstart.md        ✅ Phase 1 output (updated)
└── tasks.md             ⬜ Phase 2 output (/speckit.tasks)
```

### Source Code Changes (repository root)

```text
data/
└── music.js             ← MODIFY: add optional `image` field to playlist objects

components/
├── PlaylistBrowser.js   ← NEW: replaces PlaylistSection.js — client component managing card grid + open state
└── PlaylistSection.js   ← DELETE: superseded by PlaylistBrowser

app/music/
└── page.js              ← MODIFY: import PlaylistBrowser, remove PlaylistSection; pass playlists array

public/static/images/
└── [playlist-image].jpg ← OPTIONAL: cover images if provided (existing image dir)
```

**Structure Decision**: Single Next.js project. This is a component-level redesign — page routing and navigation are already done from the first implementation. Only `PlaylistBrowser` (new) and `app/music/page.js` (minor update) are touched.

## Complexity Tracking

No constitution violations.

---

## Phase 0: Research

**Output**: [research.md](./research.md) (updated)

### Decision 1: Component Architecture — One Component vs Two

**Decision**: Single `PlaylistBrowser.js` client component manages all state (which playlist is open) and renders both the card grid and the song detail section.

**Rationale**: The open/closed state needs to coordinate between the card buttons and the song list — a single component owning that state is simpler than lifting state or using context. The music page itself stays a Server Component (for metadata), wrapping `PlaylistBrowser` with the playlists data.

**Alternatives considered**:

- `PlaylistCard.js` (display) + `PlaylistsView.js` (state) split: Rejected — adds a file for a trivial separation with one state variable.
- Convert `app/music/page.js` to a Client Component: Rejected — loses Server Component metadata benefits without gain.

### Decision 2: Card Pattern — Reuse FeaturedArticle Pattern

**Decision**: Playlist cards visually follow the `FeaturedArticle.js` pattern: `HoverAnimation` wrapper, aspect-video image area (with `grayscale` styling), playlist name (`h3`), description (`line-clamp-2`), and song count badge in place of reading-time text.

**Rationale**: FeaturedArticle.js already demonstrates the exact visual pattern the spec references ("similar styling to articles with an image and # of songs"). Reusing the same Tailwind classes and HoverAnimation ensures visual consistency (Constitution Principle I) with zero new patterns.

**Alternatives considered**:

- Custom card design: Rejected — would diverge from existing site visual language.
- ListItem-style row cards: Rejected — less visually expressive than the featured card format; doesn't support cover images.

### Decision 3: Song Reveal Mechanism — Below-Grid Accordion

**Decision**: Clicking a card sets `openIndex` state. The open playlist's song section renders full-width below the card grid (not inline within the card row). Clicking the same card again, or clicking a different card, closes/replaces the open section.

**Rationale**: Below-grid placement gives songs a clean full-width canvas matching the reading width of the rest of the page. Inline card-row expansion would cause layout shifts and uneven card heights. This is the standard accordion pattern used in portfolio sites.

**Alternatives considered**:

- Inline expansion within card row: Rejected — causes layout reflow of sibling cards.
- Modal dialog (Radix UI Dialog): Rejected — heavier UX; modal dismissal adds complexity; spec says "on the page" not in a dialog.
- Sub-page route (`/music/[playlist]`): Rejected — adds routing complexity; spec explicitly says inline on the music page.

### Decision 4: Cover Images — Optional Field, Placeholder Fallback

**Decision**: Add an optional `image` field to each playlist in `data/music.js`. If absent, a CSS gradient placeholder (using the page's pink/purple accent colors) is rendered in the image slot.

**Rationale**: The spec requires a "representative visual" on each card but doesn't mandate a photograph. A CSS gradient is dependency-free and always available. Playlist authors can add a real image path later.

**Alternatives considered**:

- Always require an image: Rejected — would break cards for playlists without images; forces premature asset work.
- Use first song's Spotify album art (via API): Rejected — requires Spotify API auth; incompatible with static export.

### Decision 5: Open/Close Control

**Decision**: Each playlist card acts as a toggle button. When a playlist is open, clicking its card again closes it. A visible "close" affordance (↑ icon or "Close" text) also appears in the song section header for clarity.

**Rationale**: Card-as-toggle is the most natural UX — the same element that opened the view can close it. The explicit close control provides a secondary affordance per FR-008.

---

## Phase 1: Design & Contracts

### Data Model (Updated)

**Playlist**: `{ name: string, description?: string, image?: string, songs: Song[] }`

The `image` field, if provided, is a path relative to `/public/` (e.g., `'/static/images/playlists/trance.jpg'`).

**Song**: `{ title: string, artist: string, url: string }` — unchanged

### Component Design: PlaylistBrowser

```
PlaylistBrowser (props: { playlists })
  'use client'
  State: openIndex (number | null, default null)

  Renders:
  ┌── Card grid (flex-wrap or grid, similar to FeaturedArticle layout)
  │   └── For each playlist:
  │       PlaylistCard button (HoverAnimation wrapper)
  │         - image area (bg-cover aspect-video, grayscale) OR gradient placeholder
  │         - playlist name (h3, text-primary)
  │         - description (p, text-secondary, line-clamp-2)
  │         - song count (span, text-primary, uppercase small)
  │         - open indicator (↓/↑ icon when open)
  │
  └── Song section (rendered only when openIndex !== null)
      - playlist name header + close control
      - ul of songs for playlists[openIndex]
          Each song: title, artist, <iframe> Spotify embed
```

### Music Page Update

```
app/music/page.js (Server Component — unchanged structure)
  - Remove: import PlaylistSection
  - Add: import PlaylistBrowser from '../../components/PlaylistBrowser'
  - Replace: {playlists.map(p => <PlaylistSection ... />)}
  - With: <PlaylistBrowser playlists={playlists} />
```

### No Contracts Required

Personal static website — no external API surface.
