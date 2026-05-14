# Feature Specification: Resume Toast

**Feature Branch**: `007-resume-toast`  
**Created**: 2026-05-14  
**Status**: Draft  
**Input**: User description: "Build a bottom-right resume toast that invites visitors to view Zak's resume, collapses into a circular favicon Z icon if ignored, opens `/resume` when clicked, and add a resume page with a titled PDF viewer, last-updated note, and optional analytics for viewer usage."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Discover Resume Prompt (Priority: P1)

As a site visitor, I see a clear resume prompt when I first open the application so I can quickly discover that Zak's resume is available.

**Why this priority**: The prompt is the primary entry point for the resume experience and creates immediate visibility without requiring navigation changes.

**Independent Test**: Can be fully tested by opening the site in a new visitor session and confirming the resume prompt appears in the bottom-right corner with clear messaging.

**Acceptance Scenarios**:

1. **Given** a visitor opens the application for the first time in a session, **When** the initial page finishes loading, **Then** a rectangular informational prompt appears in the bottom-right corner inviting the visitor to click to view Zak's resume.
2. **Given** the resume prompt is visible, **When** the visitor reviews the page without interacting with the prompt, **Then** the prompt remains visually unobtrusive and does not block primary page content or navigation.

---

### User Story 2 - Collapse Unused Prompt (Priority: P2)

As a visitor who does not immediately need the resume, I want the prompt to collapse into a compact branded icon so the page stays clean while keeping the resume accessible.

**Why this priority**: This preserves the site's visual polish and reduces distraction while maintaining a path to the resume.

**Independent Test**: Can be tested by opening the site, waiting without clicking the prompt, and confirming it transitions into a circular Z icon that remains available.

**Acceptance Scenarios**:

1. **Given** the rectangular resume prompt is visible, **When** the visitor does not click it within the configured display period, **Then** it animates into a circular icon using the favicon-style Z branding.
2. **Given** the prompt has collapsed into the circular icon, **When** the visitor clicks the icon, **Then** the visitor is taken to the resume page.

---

### User Story 3 - View Resume Page (Priority: P1)

As a visitor interested in Zak's background, I can click the prompt and view Zak's resume on a dedicated resume page.

**Why this priority**: Viewing the resume is the core outcome of the feature and must work whether the visitor clicks the initial prompt or the collapsed icon.

**Independent Test**: Can be tested by clicking the resume prompt or visiting `/resume` directly and confirming the page clearly displays the resume and supporting context.

**Acceptance Scenarios**:

1. **Given** the resume prompt or collapsed icon is available, **When** the visitor clicks it, **Then** the visitor is navigated to `/resume`.
2. **Given** a visitor lands on `/resume`, **When** the page loads, **Then** the page displays a title clearly indicating it is Zak's resume, consistent with the site's existing page title presentation.
3. **Given** the resume page has loaded, **When** the resume document is available, **Then** the visitor can view the resume directly on the page without downloading it first.
4. **Given** the resume page title is visible, **When** the visitor scans the header area, **Then** a last-updated note is displayed near the title.

---

### User Story 4 - Understand Resume Engagement (Priority: P3)

As the site owner, I want basic insight into how visitors interact with the resume experience so I can understand whether the prompt and viewer are useful.

**Why this priority**: Analytics are valuable but should not delay the core resume discovery and viewing experience.

**Independent Test**: Can be tested by using the resume prompt and viewer in an environment with analytics enabled and confirming engagement actions are recorded.

**Acceptance Scenarios**:

1. **Given** analytics are enabled for the site, **When** a visitor opens the resume page through the prompt, **Then** the visit is distinguishable as resume-prompt driven engagement.
2. **Given** analytics are enabled and the resume viewer exposes usage activity, **When** a visitor interacts with the resume document, **Then** meaningful resume engagement is recorded where available.

### Edge Cases

- If the resume document cannot be loaded, the resume page MUST show a friendly message and provide an alternate way to access the resume.
- If motion preferences indicate reduced motion, the collapse behavior MUST avoid non-essential animation while still changing to the compact icon state.
- If the visitor is on a small screen, the prompt and collapsed icon MUST remain accessible without covering important page controls or content.
- If a visitor navigates directly to `/resume`, the resume page MUST work independently of the toast prompt.
- If analytics are unavailable or blocked, the resume experience MUST continue to function normally.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST display a bottom-right informational resume prompt when a visitor first opens the application in a session.
- **FR-002**: The initial prompt MUST be rectangular and include clear messaging that clicking it will let the visitor view Zak's resume.
- **FR-003**: Users MUST be able to click the initial prompt to navigate to `/resume`.
- **FR-004**: System MUST collapse the unclicked initial prompt into a circular branded icon after a short, non-disruptive display period.
- **FR-005**: The collapsed icon MUST use the site's Z favicon-style branding and remain clickable.
- **FR-006**: Users MUST be able to click the collapsed icon to navigate to `/resume`.
- **FR-007**: System MUST provide a dedicated `/resume` page that clearly presents itself as Zak's resume page.
- **FR-008**: The resume page title presentation MUST be visually consistent with other titled pages on the site.
- **FR-009**: The resume page MUST display a last-updated note near the title.
- **FR-010**: The resume page MUST display Zak's resume document in an embedded viewer when the document is available.
- **FR-011**: The resume page MUST provide a user-friendly fallback if the resume document cannot be displayed in the embedded viewer.
- **FR-012**: The prompt and resume page MUST be usable with keyboard navigation and understandable to assistive technologies.
- **FR-013**: System SHOULD record resume prompt and resume viewer engagement when site analytics are available, without degrading the visitor experience when analytics are unavailable.

### Key Entities

- **Resume Prompt**: A temporary call-to-action shown to visitors; key attributes include display state, message, placement, and destination.
- **Resume Document**: Zak's current resume content; key attributes include document availability, display name, and last-updated date.
- **Resume Engagement Event**: A site-owner insight about resume interactions; key attributes include interaction type, source, and occurrence time.

### Assumptions

- The resume prompt appears once per visitor session by default so repeat navigation within the same session is not overly disruptive.
- The collapsed prompt remains available during the session unless the visitor navigates to the resume page.
- The last-updated note reflects the current approved resume document date supplied with the resume content.
- Analytics are limited to non-sensitive engagement events and do not collect resume content or personal visitor information beyond existing site analytics practices.
- The resume document content already exists as an approved site asset.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: 100% of new visitor sessions show a visible resume prompt in the bottom-right corner after the initial page load.
- **SC-002**: At least 95% of visitors can reach `/resume` from either the rectangular prompt or collapsed icon in one click.
- **SC-003**: The prompt collapses into the compact branded icon within 10 seconds when not clicked.
- **SC-004**: At least 95% of direct visits to `/resume` successfully display the page title, last-updated note, and resume viewing area.
- **SC-005**: When the resume document is unavailable, visitors are shown a clear fallback path within 2 seconds of the failed load state.
- **SC-006**: Visitors using keyboard navigation can access the prompt, collapsed icon, and resume page viewer controls without a mouse.
- **SC-007**: In environments where analytics are enabled, resume prompt clicks and resume page visits are recorded for at least 95% of successful interactions.
