# Implementation Plan: Resume Toast

**Branch**: `007-resume-toast` | **Date**: 2026-05-14 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/007-resume-toast/spec.md`

## Summary

Add a global bottom-right resume call-to-action that appears as an informational rectangular toast, collapses into a circular branded Z icon when ignored, and routes visitors to a dedicated `/resume` page. The resume page will reuse the site's existing titled page layout, show a last-updated note, and embed `public/static/resume/resume.pdf` in an accessible PDF viewing experience with fallback access and lightweight analytics events.

## Technical Context

**Language/Version**: JavaScript with React 19 and Next.js 16  
**Primary Dependencies**: Next.js App Router, React, Tailwind CSS, Radix Toast, Framer Motion, Google Analytics gtag, @syncfusion/ej2-pdfviewer for resume viewing  
**Storage**: Static PDF asset in `public/static/resume/resume.pdf`; session-scoped browser state for toast visibility  
**Testing**: `pnpm lint`, `pnpm build`, and focused manual QA for toast behavior, keyboard access, reduced motion, PDF fallback, and analytics-safe failure paths  
**Target Platform**: Static-exported web application deployed on Vercel  
**Project Type**: Single Next.js personal website  
**Performance Goals**: Initial toast must not delay page interactivity; PDF viewer code should be isolated to the resume page; fallback state appears within 2 seconds of a failed document load  
**Constraints**: Must remain compatible with `output: 'export'`; no server functions, edge runtime, databases, or heavyweight test infrastructure; dark-mode-first UI; new Syncfusion dependency is allowed only because the feature request explicitly specified it  
**Scale/Scope**: One global CTA component, one `/resume` route, one static resume document, and optional non-sensitive analytics events

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- **Visual Consistency**: PASS — plan reuses existing Base page layout, dark theme colors, bottom-right toast conventions, and favicon-style Z branding.
- **Personal Showcase**: PASS — feature directly highlights Zak's resume and professional background.
- **Dark Mode First**: PASS — all UI is planned for the existing dark site aesthetic; no light-mode work is introduced.
- **Lightweight Testing**: PASS — validation uses existing lint/build scripts plus focused manual QA; no heavy end-to-end framework is introduced.
- **Dependency Discipline**: PASS WITH NOTE — the requested PDF viewer introduces `@syncfusion/ej2-pdfviewer`; this is explicitly requested by the owner and will be isolated to the resume page. Existing Radix Toast and Framer Motion cover the toast behavior without adding another toast dependency.
- **Deployment Standards**: PASS — all behavior is client/static compatible and uses the existing `public/` asset path; no server runtime is planned.
- **Code Quality Standards**: PASS — implementation must satisfy existing ESLint, Prettier, and import-sort rules.

## Project Structure

### Documentation (this feature)

```text
specs/007-resume-toast/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── resume-toast-ui.md
└── tasks.md             # Created later by /speckit.tasks
```

### Source Code (repository root)

```text
app/
├── layout.js            # Mount global resume toast inside the site shell
├── resume/
│   ├── page.js          # Resume route metadata and Base layout
│   └── ResumeClient.js  # Client-side PDF viewer area and fallback state
└── globals.css          # Any small global animation/accessibility additions if needed

components/
└── ResumeToast.js       # Bottom-right resume CTA, collapse behavior, and navigation

public/static/resume/
└── resume.pdf           # Resume document displayed on /resume
```

**Structure Decision**: Keep the feature in the existing App Router website structure. The toast is a reusable global component mounted from the root layout, while the PDF viewer is route-scoped so viewer code and behavior stay isolated to `/resume`.

## Phase 0: Research Summary

Completed in [research.md](./research.md). Key decisions:

- Use existing Radix Toast accessibility patterns and Framer Motion for the resume prompt rather than introducing another toast library.
- Use the owner-requested Syncfusion PDF viewer only on `/resume`, with a direct PDF fallback link to preserve static-export reliability.
- Track resume prompt/page engagement through the existing Google Analytics `gtag` setup when available, while treating analytics as optional.
- Use session-scoped browser state so the full rectangular prompt appears once per browser session and collapses without permanently hiding the resume path.

## Phase 1: Design Summary

Completed artifacts:

- [data-model.md](./data-model.md) defines Resume Prompt, Resume Document, and Resume Engagement Event states.
- [contracts/resume-toast-ui.md](./contracts/resume-toast-ui.md) defines visible UI behavior, accessibility, and analytics contracts.
- [quickstart.md](./quickstart.md) lists local validation steps for the feature.

## Post-Design Constitution Check

- **Visual Consistency**: PASS — design contracts require the existing dark theme, page title style, and non-blocking bottom-right placement.
- **Personal Showcase**: PASS — all entities and UI flows support resume discovery and viewing.
- **Dark Mode First**: PASS — no light-mode scope added.
- **Lightweight Testing**: PASS — quickstart uses `pnpm lint`, `pnpm build`, and manual checks only.
- **Dependency Discipline**: PASS WITH NOTE — `@syncfusion/ej2-pdfviewer` remains the only new dependency and is owner-requested; no extra analytics, toast, state, or testing dependencies are planned.
- **Deployment Standards**: PASS — contracts avoid server-only PDF processing and require a static PDF fallback.
- **Code Quality Standards**: PASS — planned files remain within existing JS/React conventions and lint/build validation.

## Complexity Tracking

No constitutional violations require justification.
