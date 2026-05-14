# UI Contract: Resume Toast and Resume Page

## Global Resume Prompt

### Expanded State

- Appears in the bottom-right corner after the site initially loads for a new browser session.
- Uses a rectangular informational presentation consistent with the site's dark visual language.
- Includes text equivalent to "Click to view my resume".
- Is clickable and keyboard-focusable.
- Activating it navigates to `/resume`.
- Does not cover primary navigation or critical page controls on desktop or small screens.

### Collapse Behavior

- If not activated, the expanded prompt changes to the compact state within 10 seconds.
- The transition uses motion when allowed by visitor preferences.
- When reduced motion is preferred, the state change occurs without non-essential animation.

### Collapsed State

- Appears as a circular branded icon using the site's Z favicon-style mark.
- Remains in the bottom-right corner and remains keyboard-focusable.
- Activating it navigates to `/resume`.
- Has an accessible name communicating that it opens Zak's resume.

### Route Interaction

- The prompt should not distract from the resume page itself; when the visitor is already on `/resume`, the prompt may be hidden.
- Direct navigation to `/resume` must not depend on the prompt having appeared previously.

## Resume Page

### Page Header

- Route path is `/resume`.
- Page title clearly identifies the page as Zak's resume.
- Title styling is consistent with the site's other primary pages.
- A last-updated note appears near the title.

### Resume Viewer

- Displays the resume document from `/static/resume/resume.pdf` in an embedded viewing area when available.
- Provides an accessible viewing region label.
- Does not require visitors to download the document before viewing.
- Provides a friendly fallback message and direct PDF access if embedded viewing fails.

### Analytics Contract

- If the existing analytics function is available, the following interactions should be recorded:
  - Expanded prompt click.
  - Collapsed icon click.
  - Resume page visit.
  - Resume viewer engagement when available from the viewer.
- Analytics failure or blocking must not alter the UI flow, navigation, or fallback behavior.
- Events must not include resume content or sensitive visitor data.

## Acceptance Verification

- A new session shows the expanded prompt in the bottom-right corner.
- Waiting without clicking collapses the prompt into a circular Z icon within 10 seconds.
- Clicking either prompt state reaches `/resume` in one action.
- `/resume` displays the title, last-updated note, and resume viewing area.
- Missing or blocked PDF rendering shows fallback access within 2 seconds of the failed state.
- Keyboard-only users can focus and activate the prompt and collapsed icon.
