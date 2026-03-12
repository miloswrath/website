# v1 Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-03-12

## Active Technologies

- JavaScript (ESM) — Node.js via Next.js + Next.js 16, React 19, Tailwind CSS 4, Framer Motion 12 (existing stack) (004-music-playlists)

## Project Structure

```text
app/          # Next.js App Router pages
components/   # Reusable React components
data/         # Static content data (JS arrays)
layouts/      # Page layout wrappers (Base.js)
lib/          # Utility functions
public/       # Static assets (icons, images, fonts)
articles/     # MDX blog content
specs/        # Feature specifications and plans
```

## Commands

pnpm dev # Start dev server
pnpm build # Build static export
pnpm lint # ESLint + Prettier fix
pnpm deploy # Deploy to Vercel production

## Code Style

- JavaScript ESM; `'use client'` directive for interactive components
- Tailwind CSS utility classes; OKLCH color tokens from globals.css
- Framer Motion for animations; follow existing HoverAnimation pattern
- pnpm as package manager; no new runtime deps without owner approval

## Recent Changes

- 004-music-playlists (revised): Card-based playlist browser — PlaylistBrowser.js replaces PlaylistSection.js; playlist data gains optional `image` field

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
