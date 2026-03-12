# Research: Music Playlists Section (Revised)

**Feature**: 004-music-playlists
**Date**: 2026-03-12 — updated for card-based UX redesign

---

## Decision 1: Component Architecture

**Decision**: Single `PlaylistBrowser.js` `'use client'` component owns all interactive state and renders both the playlist card grid and the open song section.

**Rationale**: One state variable (`openIndex: number | null`) coordinates both the card highlight and song reveal. Centralizing this in one component is simpler than lifting state into the page or using context. `app/music/page.js` remains a Server Component, importing `PlaylistBrowser` and passing the static `playlists` array as a prop.

**Alternatives considered**:

- Split into `PlaylistCard` + `PlaylistsView` components: Rejected — unnecessary file for trivial separation.
- Convert page to Client Component: Rejected — loses Server Component metadata optimization for no benefit.

---

## Decision 2: Card Visual Pattern

**Decision**: Reuse the `FeaturedArticle.js` visual pattern — `HoverAnimation` wrapper, `aspect-video` image area with `bg-cover grayscale` styling, `text-primary` h3 title, `text-secondary line-clamp-2` description, and a small uppercase song count in place of reading time.

**Rationale**: The spec explicitly says "similar styling to articles with an image." FeaturedArticle.js is the exact reference implementation already in the codebase. Reusing its classes preserves Constitution Principle I (Visual Consistency) with zero invention.

**Alternatives considered**:

- Custom card design from scratch: Rejected — diverges from existing visual language.
- ListItem-style horizontal row: Rejected — doesn't accommodate cover images; less expressive.

---

## Decision 3: Song Reveal Placement

**Decision**: Open playlist songs render full-width below the entire card grid, not inline within a card row.

**Rationale**: Full-width below-grid placement gives songs the same reading width as the rest of the page content, creating a natural reading flow. Inline expansion within the card row would shift card positions and create uneven row heights.

**Alternatives considered**:

- Inline card-row accordion: Rejected — causes layout reflow and uneven card grid.
- Radix UI Dialog modal: Rejected — heavier UX; adds dismissal complexity; spec says "on the page."
- Sub-page route `/music/[slug]`: Rejected — routing complexity; spec explicitly specifies same-page reveal.

---

## Decision 4: Cover Images

**Decision**: Add optional `image` string field to playlist data. If a playlist has no `image`, render a CSS gradient placeholder using the page's existing pink-to-purple color tokens.

**Rationale**: Avoids requiring image assets for every playlist while still providing a visual in the card. The gradient uses existing colors from the Base layout's color map — no new color values needed.

**Alternatives considered**:

- Always require image: Rejected — blocks adding playlists without assets.
- Spotify album art via API: Rejected — requires OAuth; incompatible with static export.
- Solid-color placeholder: Less visually interesting than a gradient; gradient matches site aesthetic better.

---

## Decision 5: Toggle Behavior

**Decision**: Each playlist card is a `<button>` that toggles its `openIndex`. Clicking an already-open card closes it (`setOpenIndex(null)`). A secondary "close" affordance (↑ caret or "Close" text) appears in the song section header.

**Rationale**: Card-as-toggle is the most intuitive pattern — the element that opened the view can close it. The explicit close control in the song section satisfies FR-008 without requiring a separate close button on the card.

**Alternatives considered**:

- Close only via explicit close button: Rejected — less intuitive; user expects clicking the card again to close it.
- Close automatically when scrolling away: Rejected — unexpected behavior; breaks FR-007 (one open at a time).

---

## Superseded Decisions (from v1)

- ~~Collapse threshold of 3 songs~~ — replaced by card-based navigation; no in-page collapse needed.
- ~~PlaylistSection.js inline expand/collapse~~ — replaced by PlaylistBrowser with card grid + below-grid song view.
