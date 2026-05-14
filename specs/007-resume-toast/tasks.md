---
description: 'Task list for Resume Toast feature implementation'
---

# Tasks: Resume Toast

**Input**: Design documents from `/specs/007-resume-toast/`
**Prerequisites**: plan.md ✓, spec.md ✓, data-model.md ✓, contracts/resume-toast-ui.md ✓, research.md ✓, quickstart.md ✓

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Exact file paths are included in all descriptions

## Path Conventions

Single Next.js App Router project at repository root:
- Pages: `app/`
- Components: `components/`
- Layouts: `layouts/`
- Static assets: `public/static/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install the one new dependency required for the PDF viewer and confirm the static PDF asset is in place.

- [ ] T001 Install `@syncfusion/ej2-pdfviewer` via `pnpm add @syncfusion/ej2-pdfviewer` and confirm `public/static/resume/resume.pdf` is present

**Checkpoint**: Dependency installed, PDF asset confirmed — user story work can begin.

---

## Phase 2: User Story 1 — Discover Resume Prompt (Priority: P1) 🎯 MVP

**Goal**: A rectangular resume call-to-action appears in the bottom-right corner on the first page load of a browser session, inviting the visitor to view Zak's resume.

**Independent Test**: Open the site in a fresh browser session; confirm the rectangular prompt appears in the bottom-right, is readable, does not block navigation, can be clicked, and navigates to `/resume`.

### Implementation for User Story 1

- [ ] T002 [US1] Create `components/ResumeToast.js` as a `'use client'` component with a rectangular Radix Toast-based expanded state rendered in the bottom-right viewport corner
- [ ] T003 [US1] Add sessionStorage check in `components/ResumeToast.js` so the expanded prompt is shown only once per browser session (`hasExpandedThisSession` flag)
- [ ] T004 [US1] Add accessible name, keyboard focusability, and click handler that navigates to `/resume` on the expanded prompt in `components/ResumeToast.js`
- [ ] T005 [US1] Mount `<ResumeToast />` inside the root shell in `app/layout.js` so it appears globally on all non-resume pages
- [ ] T006 [US1] Verify bottom-right placement does not overlap the navbar or primary page content on desktop and small-screen viewports (manual check, adjust Tailwind classes in `components/ResumeToast.js` as needed)

**Checkpoint**: User Story 1 fully functional — new session shows prompt, click reaches `/resume`.

---

## Phase 3: User Story 3 — View Resume Page (Priority: P1)

**Goal**: A dedicated `/resume` page displays Zak's resume title, a last-updated note, and the embedded PDF viewer with a graceful fallback when the viewer cannot load.

**Independent Test**: Visit `/resume` directly; confirm the page title, last-updated note, and PDF viewer appear. Block the PDF asset and confirm the fallback message and direct PDF link appear within 2 seconds.

### Implementation for User Story 3

- [ ] T007 [P] [US3] Create `app/resume/page.js` as a server component with Next.js metadata, Base layout, a page title matching the existing titled page style (e.g., `"Resume // Zak Gilliam"`), and a visible last-updated note
- [ ] T008 [P] [US3] Create `app/resume/ResumeClient.js` as a `'use client'` component that dynamically imports the Syncfusion PdfViewerComponent and loads `/static/resume/resume.pdf`
- [ ] T009 [US3] Implement `loading` and `ready` viewer states in `app/resume/ResumeClient.js` (spinner or skeleton while the viewer initializes, then the rendered document)
- [ ] T010 [US3] Implement `fallback` state in `app/resume/ResumeClient.js` — show a friendly message and a direct `<a href="/static/resume/resume.pdf">` link when the viewer or document errors; ensure fallback appears within 2 seconds of the failed state
- [ ] T011 [US3] Add `aria-label` accessible region label to the PDF viewing area in `app/resume/ResumeClient.js`

**Checkpoint**: User Story 3 fully functional — `/resume` loads independently, displays viewer, shows fallback on error.

---

## Phase 4: User Story 2 — Collapse Unused Prompt (Priority: P2)

**Goal**: After the expanded prompt has been visible for up to 10 seconds without a click, it animates into a compact circular Z icon that stays in the bottom-right corner and still navigates to `/resume` when clicked.

**Independent Test**: Open the site in a fresh session, wait without clicking; confirm the prompt transitions to a circular Z icon within 10 seconds. Click the icon; confirm navigation to `/resume`. Enable `prefers-reduced-motion` and repeat; confirm the visual state change still occurs without animation.

### Implementation for User Story 2

- [ ] T012 [US2] Add collapse timer logic (≤10 seconds, matching `collapseDelaySeconds` from data-model.md) in `components/ResumeToast.js` using `setTimeout` that transitions `state` from `expanded` to `collapsed`
- [ ] T013 [US2] Implement the collapsed circular state in `components/ResumeToast.js` using the site's favicon Z branding (reference existing Z icon asset in `public/static/icons/`) with a click handler navigating to `/resume`
- [ ] T014 [US2] Add Framer Motion layout/opacity transition for the `expanded → collapsed` change in `components/ResumeToast.js`; use `useReducedMotion()` to disable non-essential animation when the visitor prefers reduced motion
- [ ] T015 [US2] Add `aria-label="View Zak's resume"` (or equivalent) to the collapsed circular icon in `components/ResumeToast.js` so its accessible name is clear in both states
- [ ] T016 [US2] Use `usePathname` from `next/navigation` in `components/ResumeToast.js` to set `state` to `hidden-on-resume-page` when the visitor is already on `/resume`

**Checkpoint**: User Story 2 fully functional — prompt collapses within 10 s, icon is clickable and accessible, prompt hides on `/resume`.

---

## Phase 5: User Story 4 — Understand Resume Engagement (Priority: P3)

**Goal**: When Google Analytics is available, resume prompt interactions and the resume page view are recorded as non-blocking engagement events; the feature works identically when analytics are absent.

**Independent Test**: Open the browser dev tools Network panel, enable analytics, click the expanded prompt and the collapsed icon, and visit `/resume`; confirm the corresponding `gtag` events appear. Disable analytics; confirm navigation and viewing are unaffected.

### Implementation for User Story 4

- [ ] T017 [P] [US4] Add a safe `gtag` call for expanded prompt click (`resume_prompt_click`, `source: expanded_prompt`) in the click handler in `components/ResumeToast.js`
- [ ] T018 [P] [US4] Add a safe `gtag` call for collapsed icon click (`resume_icon_click`, `source: collapsed_icon`) in the icon click handler in `components/ResumeToast.js`
- [ ] T019 [P] [US4] Add a safe `gtag` call for resume page view (`resume_page_view`, `source: direct_route`) on component mount in `app/resume/ResumeClient.js`
- [ ] T020 [US4] Wrap every `gtag` call across `components/ResumeToast.js` and `app/resume/ResumeClient.js` in `typeof window !== 'undefined' && typeof window.gtag === 'function'` guards so missing analytics never throws or alters the UI

**Checkpoint**: User Story 4 fully functional — events fire when analytics are present; zero impact on UX when they are absent.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Code quality validation, manual QA, and accessibility verification across all user stories.

- [ ] T021 Run `pnpm lint` and resolve all ESLint and Prettier violations in newly created files
- [ ] T022 Run `pnpm build` and confirm the static export completes without errors; confirm resume page is included in the output
- [ ] T023 [P] Manual QA per quickstart.md — verify expanded prompt, collapse timer, both click paths, `/resume` page title, last-updated note, PDF viewer, and fallback message
- [ ] T024 [P] Keyboard-only accessibility check — tab to expanded prompt → Enter navigates to `/resume`; tab to collapsed icon → Enter navigates; tab to viewer controls works without a mouse
- [ ] T025 [P] Reduced-motion check — enable OS/browser `prefers-reduced-motion`; confirm toast still transitions to collapsed icon without non-essential animation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **User Story 1 (Phase 2)**: Depends only on Phase 1 — MVP scope; can start immediately after T001
- **User Story 3 (Phase 3)**: Depends only on Phase 1 — can be worked in parallel with Phase 2 (different files)
- **User Story 2 (Phase 4)**: Depends on Phase 2 (`ResumeToast.js` must exist with base expanded state)
- **User Story 4 (Phase 5)**: Depends on Phase 2 and Phase 3 (analytics wrap existing interaction handlers)
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **US1 (P1)**: Starts after Phase 1 — no story dependencies
- **US3 (P1)**: Starts after Phase 1 — no story dependencies, fully parallel with US1
- **US2 (P2)**: Starts after US1 — adds collapse behavior to the existing `ResumeToast.js`
- **US4 (P3)**: Starts after US1 and US3 — wraps existing click handlers with analytics

### Within Each User Story

- Sequential within `ResumeToast.js` (T002 → T003 → T004 → T005 → T006)
- T007 and T008 are parallel (different files: `page.js` vs `ResumeClient.js`)
- T017, T018, and T019 are parallel (T017/T018 touch `ResumeToast.js`, T019 touches `ResumeClient.js`)

---

## Parallel Example: User Story 1 + User Story 3

```bash
# After T001 completes, start both stories simultaneously:
Task A: T002–T006  # components/ResumeToast.js (US1)
Task B: T007–T011  # app/resume/page.js + ResumeClient.js (US3)
```

## Parallel Example: User Story 4

```bash
# T017/T018 and T019 touch different files — launch together:
Task A: T017, T018  # ResumeToast.js analytics
Task B: T019        # ResumeClient.js analytics
# T020 must run after A and B are complete
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 3 Only)

1. Complete Phase 1: Install dependency, confirm PDF asset
2. Complete Phase 2 (US1): Expanded toast, session state, keyboard access, global mount
3. Complete Phase 3 (US3, parallel): Resume page, PDF viewer, fallback, accessible label
4. **STOP and VALIDATE**: Confirm new-session prompt, click-to-resume, page title, viewer, fallback
5. Deploy/demo — core resume discovery and viewing is live

### Full Delivery

1. Setup + US1 + US3 (parallel) → MVP validated
2. Add US2 → collapse behavior tested → incremental deploy
3. Add US4 → analytics verified → final deploy
4. Polish phase: lint, build, manual QA, accessibility check

---

## Notes

- [P] tasks = different files or no shared dependencies — safe to execute in parallel
- [Story] label maps each task to a user story for traceability
- `public/static/resume/resume.pdf` already exists — no PDF creation task needed
- Syncfusion viewer must be isolated to `app/resume/ResumeClient.js` via dynamic import to keep it off the home-page bundle
- Session state uses `sessionStorage` (not `localStorage`) so the prompt reappears in each new browser session
- All gtag calls must be guarded — analytics must never block navigation or throw
- Commit after each phase checkpoint and validate the checkpoint before advancing
