# Tasks: Music Playlists Section — Card-Based UX Redesign

**Input**: Design documents from `/specs/004-music-playlists/` (revised plan)
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, quickstart.md ✅

**Tests**: Not requested — no test tasks generated.

**Context**: Route, navigation, and data file are already in place from the first implementation. This revision replaces `PlaylistSection.js` (always-expanded inline layout) with `PlaylistBrowser.js` (card grid + click-to-reveal song section).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)

---

## Phase 1: Setup

**Purpose**: Prepare the workspace before component work begins.

- [x] T001 Confirm `components/PlaylistSection.js` is only imported in `app/music/page.js` — search codebase for any other imports of `PlaylistSection` to ensure safe deletion later (read-only verification step; no code change)
- [x] T002 [P] Create directory `public/static/images/playlists/` to hold future playlist cover art images (the `image` field in playlist data will reference paths within this directory)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: All route, navigation, and data infrastructure from the first implementation is already complete. The only foundational step here is ensuring the music page won't break during the component swap.

**⚠️ CRITICAL**: Complete before any user story work.

- [x] T003 Update `app/music/page.js` — remove the `import PlaylistSection` line and its JSX usage `{playlists.map(...<PlaylistSection .../>)}`; replace with `<PlaylistBrowser playlists={playlists} />` and add `import PlaylistBrowser from '../../components/PlaylistBrowser'`; note: `PlaylistBrowser.js` does not exist yet — this edit will cause a build error until T005 is complete, so these two tasks (T003 and T005) must be treated as a single atomic unit executed back-to-back

**Checkpoint**: After T003 + T005 complete together, `/music` loads via `pnpm dev` without errors.

---

## Phase 3: User Story 1 — Browse Playlist Cards (Priority: P1) 🎯 MVP

**Goal**: Visitors see all playlists as compact, scannable cards showing name, description, song count, and a visual — with no song listings visible at page load.

**Independent Test**: Load `/music` — verify each playlist appears as a card with (1) a visual/image area, (2) playlist name, (3) description (if present), (4) song count. No Spotify embeds visible. All cards fit in the viewport without scrolling through song lists.

### Implementation for User Story 1

- [x] T004 [P] [US1] Create `public/static/images/playlists/` — already done in T002; confirm the directory is available for image references
- [x] T005 [US1] Create `components/PlaylistBrowser.js` as a `'use client'` React component — implement the card grid:
  - Import `useState` from `'react'` and `{ HoverAnimation }` from `'./HoverAnimation'`
  - Accept props: `{ playlists }`
  - State: `const [openIndex, setOpenIndex] = useState(null)`
  - Helper: `function getEmbedUrl(spotifyUrl) { const url = new URL(spotifyUrl); const trackId = url.pathname.split('/').pop(); return \`https://open.spotify.com/embed/track/\${trackId}?utm_source=generator\`; }`
  - Render a card grid container `<div className="my-2.5 -ml-5 md:flex md:flex-wrap md:w-[calc(100%+3.375rem)]">` (mirrors FeaturedArticle page layout)
  - For each playlist at index `i`, render a card `<button type="button" onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full border-0 text-left md:w-1/2 lg:w-1/3">`
  - Wrap the card interior in `<HoverAnimation id={i} layoutId="playlistCards" className="relative block w-full p-5">`
  - Inside HoverAnimation: (a) image/gradient area: `<div className="mb-5 aspect-video w-full rounded-lg bg-cover bg-center bg-no-repeat grayscale" style={{ backgroundImage: playlist.image ? \`url(\${playlist.image})\` : 'linear-gradient(135deg, #ff80bf 0%, #9580ff 100%)' }} />`; (b) name: `<h3 className="text-primary m-0">{playlist.name}</h3>`; (c) description (if present): `<p className="text-secondary m-0 line-clamp-2">{playlist.description}</p>`; (d) song count: `<p className="text-primary my-1.25 mt-1.25 inline-block text-xs font-medium tracking-[0.075rem] uppercase">{count} {count === 1 ? 'song' : 'songs'}</p>`where`const count = playlist.songs.length`
  - Song section: render `null` for now (added in T006); export default the component

**Checkpoint**: User Story 1 fully functional — card grid renders, all playlists visible as cards, no song embeds shown. Clicking cards has no visual effect yet (state updates but song section not rendered). Page is independently shippable as MVP.

---

## Phase 4: User Story 2 — Open a Playlist to Browse Songs (Priority: P2)

**Goal**: Clicking a playlist card reveals that playlist's songs with inline Spotify embeds in a focused section below the card grid. Clicking the same card or a close control collapses the section. Only one playlist is open at a time.

**Independent Test**: Click the "Working to Trance" card — verify a song section appears below the grid showing all 5 songs with titles, artists, and Spotify embeds. Click the same card again — verify the section collapses. Click a second card — verify the first closes and the second opens.

### Implementation for User Story 2

- [x] T006 [US2] Update `components/PlaylistBrowser.js` — add the song section rendered below the card grid when `openIndex !== null`:
  - After the card grid closing tag, add: `{openIndex !== null && (<div className="mt-8 w-[calc(100%+2.5rem)] -ml-5 px-5">...</div>)}`
  - Inside the section div: (a) section header `<div className="flex items-center justify-between mb-6">` containing `<h2 className="text-primary m-0">{playlists[openIndex].name}</h2>` and close button `<button type="button" onClick={() => setOpenIndex(null)} className="text-secondary hover:text-primary cursor-pointer border-none bg-transparent p-0 text-sm transition-colors duration-200">Close ↑</button>`
  - Song list `<ul className="m-0 list-none p-0">` with one `<li key={\`\${song.title}-\${idx}\`} className="border-hover border-b py-6 last:border-0">`per song in`playlists[openIndex].songs`; each li contains: title `<p className="text-primary mb-0.5 font-bold leading-6">{song.title}</p>`, artist `<p className="text-secondary mb-3 text-sm">{song.artist}</p>`, Spotify iframe `<iframe data-testid="embed-iframe" style={{ borderRadius: '12px' }} src={getEmbedUrl(song.url)} width="100%" height="152" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />`

**Checkpoint**: User Stories 1 and 2 both work — card grid visible on load, clicking opens song section with working embeds, close control collapses it, only one open at a time.

---

## Phase 5: User Story 3 — Scan Song Count and Vibe (Priority: P3)

**Goal**: Song count on each card is accurate and uses correct singular/plural form. Long descriptions are truncated at 2 lines so no card dominates the layout.

**Independent Test**: Verify the "Working to Trance" card shows "5 songs" (plural), the "Slightly Sad, but not too much" card shows "2 songs". Open each playlist and count the visible songs — counts must match.

### Implementation for User Story 3

- [x] T007 [US3] Verify `components/PlaylistBrowser.js` song count logic — confirm the count expression `const count = playlist.songs.length` and the template `` `${count} ${count === 1 ? 'song' : 'songs'}` `` correctly handles singular ("1 song") vs plural; verify `line-clamp-2` is applied to the description `<p>` so it truncates beyond 2 lines; no code change expected — this is a review task that updates the component if either condition is not met

**Checkpoint**: All three user stories independently functional. Cards accurate and scannable. Songs reveal and collapse correctly.

---

## Final Phase: Polish & Cross-Cutting Concerns

**Purpose**: Cleanup old component and ensure lint compliance.

- [x] T008 [P] Delete `components/PlaylistSection.js` — no longer needed; has been replaced by `PlaylistBrowser.js`; confirm it is not imported anywhere before deleting
- [x] T009 Run `pnpm lint` from project root to ensure all modified files pass ESLint (`eslint-config-next`) and Prettier — fix any violations before marking complete

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — T001 and T002 are parallel
- **Foundational (Phase 2)**: T003 depends on T001 confirmation; T003 and T005 are an **atomic pair** (execute back-to-back to avoid broken build state)
- **US1 (Phase 3)**: T005 IS the foundational component — US1 and Foundation merge here
- **US2 (Phase 4)**: Depends on T005 (PlaylistBrowser must exist); T006 extends the same file
- **US3 (Phase 5)**: Depends on T005 (verifies what T005 implemented)
- **Polish (Final Phase)**: Depends on all user story phases complete

### User Story Dependencies

- **US1 (P1)**: Requires T003 + T005 as an atomic pair — no other prerequisites
- **US2 (P2)**: Depends on US1 (T006 extends PlaylistBrowser built in T005)
- **US3 (P3)**: Depends on US1 (T007 reviews component built in T005)

### Within Each User Story

- T003 (page import) → T005 (create component): must execute as a pair
- T005 (component skeleton) → T006 (add song section)
- T005 (component skeleton) → T007 (verify count/description)
- T007, T006 both complete → T008 (delete old component)

### Parallel Opportunities

- T001 and T002 (Phase 1): Parallel — different files
- T008 and T009 (Polish): Parallel — different files

---

## Parallel Example: Phase 1

```
# Launch simultaneously:
Task: T001 — Verify PlaylistSection import scope (read-only)
Task: T002 — Create public/static/images/playlists/ directory
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001, T002)
2. Complete T003 + T005 as atomic pair: page wired to PlaylistBrowser, PlaylistBrowser card grid created
3. **STOP and VALIDATE**: `/music` shows card grid, all playlists visible, no songs visible on load
4. Ship — independently useful as a browse view even without song reveal

### Incremental Delivery

1. Setup (T001, T002) → workspace ready ✓
2. T003 + T005 (US1) → card grid MVP ✓
3. T006 (US2) → click-to-reveal songs ✓
4. T007 (US3) → count/description verified ✓
5. T008, T009 (Polish) → old component deleted, lint clean ✓

---

## Notes

- [P] tasks = different files, no shared state dependencies
- **T003 and T005 are an atomic pair** — do not complete T003 without immediately completing T005, as the intermediate state has a broken import
- T007 is a verification task — it updates `PlaylistBrowser.js` only if a bug is found; most likely it requires no code change
- No tests requested — verify each checkpoint visually via `pnpm dev`
- The existing `data/music.js` is fully compatible with the new design (image field is optional; existing playlists without `image` will show the gradient placeholder)
- `PlaylistSection.js` deletion (T008) is safe once T005 is complete and page.js is updated
