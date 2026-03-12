<!--
SYNC IMPACT REPORT
==================
Version change: (none) → 1.0.0 (initial ratification)
Modified principles: N/A (initial version)
Added sections:
  - Core Principles (I–V)
  - Deployment Standards
  - Code Quality Standards
  - Governance
Removed sections: N/A
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ (Constitution Check section is generic; no changes required)
  - .specify/templates/spec-template.md ✅ (no principle-specific mandatory sections to inject)
  - .specify/templates/tasks-template.md ✅ (task categories aligned; no changes required)
Follow-up TODOs: none — all placeholders resolved.
-->

# Personal Web Page Constitution

## Core Principles

### I. Visual Consistency

All pages and components MUST maintain a unified visual language: consistent typography,
color usage, spacing scale, and interactive patterns. No page may introduce divergent
design patterns without an explicit amendment to this constitution.

**Rationale**: A personal site reflects the owner's identity. Visual fragmentation
undermines credibility and professionalism.

### II. Personal Showcase

The site MUST surface the owner's personal qualities, skills, and accomplishments.
Every major page MUST contribute to this narrative. Content that does not serve this
goal MUST NOT be included.

**Rationale**: The primary purpose of the site is to communicate who Zak is to
visitors — it is not a generic portfolio template.

### III. Dark Mode First

The site MUST render in dark mode. A light mode variant is not required. Any new UI
component or page MUST be designed and implemented for dark mode from the outset.
Introducing a light mode toggle requires an explicit amendment.

**Rationale**: Dark mode is a deliberate aesthetic choice that defines the site's
identity. Retrofitting later would be costly and visually inconsistent.

### IV. Lightweight Testing

If a testing framework is introduced or extended, it MUST remain lightweight. Heavy
test infrastructure (e.g., full end-to-end browser suites, test databases, CI-only
test environments) MUST NOT be added without explicit owner approval. Tests MUST be
fast, local, and minimal in scope.

**Rationale**: This is a single-developer personal project; test overhead MUST remain
proportionate to that scale and context.

### V. Dependency Discipline

No new runtime or development dependency may be added without explicit owner permission.
Before proposing a new dependency, the implementer MUST first verify whether the
requirement can be satisfied by an existing dependency in the project. The existing
stack (Next.js, React, Tailwind CSS, Radix UI, Framer Motion) MUST be leveraged fully
before introducing new packages.

**Rationale**: Dependency bloat increases bundle size, upgrade burden, and security
surface area. Each addition MUST be justified against these costs.

## Deployment Standards

The site is hosted as a static export on Vercel. Deployment is triggered via
`pnpm deploy` (`vercel --prod`). The following constraints MUST be respected:

- The site MUST remain statically exportable; no server-side runtime beyond Next.js
  static export may be introduced.
- Server functions, Edge Runtime, or external database connections MUST NOT be added
  without an explicit constitutional amendment.
- The `out/` directory is the canonical build artifact.

## Code Quality Standards

- All code MUST pass ESLint (`eslint-config-next` + `eslint-config-prettier`) without
  errors before merge.
- All code MUST be formatted with Prettier before commit.
- TypeScript type safety MUST be maintained; `any` types MUST be avoided unless
  explicitly justified inline.
- Import order MUST follow `eslint-plugin-simple-import-sort` conventions.

## Governance

This constitution supersedes all other practices and style guides for this project.
It is the authoritative reference for all feature development, code review, and
agent-driven implementation.

**Amendment procedure**:
1. Propose the amendment in writing, citing which principle or section is affected.
2. Receive explicit owner approval before implementing changes that contradict this
   constitution.
3. Update this file with a version bump per the versioning policy below.
4. Propagate changes to all dependent templates and documents.

**Versioning policy**:
- MAJOR: Removal or backward-incompatible redefinition of an existing principle.
- MINOR: Addition of a new principle or section with material new constraints.
- PATCH: Clarifications, wording improvements, or non-semantic refinements.

**Compliance**: All PRs and agent-driven tasks MUST verify compliance with this
constitution before merging. Violations MUST be noted in the Complexity Tracking
section of `plan.md` with explicit justification.

**Version**: 1.0.0 | **Ratified**: 2026-03-08 | **Last Amended**: 2026-03-12
