# Quickstart: Resume Toast

## Prerequisites

- Use the existing project package manager: `pnpm`.
- Ensure `public/static/resume/resume.pdf` exists.
- If adding the requested PDF viewer dependency, install only the owner-requested package and keep it scoped to the resume page implementation.

## Local Validation

1. Install dependencies if needed:

   ```bash
   pnpm install
   ```

2. Start the local site:

   ```bash
   pnpm dev
   ```

3. Open the site in a fresh browser session.

4. Verify the resume prompt:
   - Expanded rectangular prompt appears in the bottom-right corner.
   - Prompt copy clearly invites visitors to view Zak's resume.
   - Prompt does not block primary navigation or important content.
   - Waiting without clicking collapses it into a circular Z icon within 10 seconds.
   - Clicking the expanded prompt reaches `/resume`.
   - Clicking the collapsed icon reaches `/resume`.

5. Verify accessibility behavior:
   - Prompt and collapsed icon can be reached with keyboard navigation.
   - Each state has an understandable accessible name.
   - Reduced-motion preference removes non-essential animation while preserving state change.

6. Verify the resume page:
   - `/resume` loads directly.
   - Page title clearly identifies Zak's resume and matches existing title styling.
   - Last-updated note is visible near the title.
   - Resume document displays from `/static/resume/resume.pdf`.
   - If PDF rendering is blocked or fails, a friendly fallback and direct PDF access are shown.

7. Verify analytics-safe behavior:
   - With analytics available, prompt clicks and resume page visits are recorded.
   - With analytics blocked or unavailable, navigation and viewing still work normally.

8. Run project checks:

   ```bash
   pnpm lint
   pnpm build
   ```

## Expected Result

Visitors can discover, open, and view Zak's resume from a polished, non-disruptive CTA while the site remains statically exportable and visually consistent.
