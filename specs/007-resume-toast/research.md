# Research: Resume Toast

## Decision: Use the existing site shell for a global resume prompt

**Rationale**: The prompt needs to appear when visitors first open the application and remain available across pages. Mounting it in the root site shell keeps the behavior consistent without duplicating CTA logic on every route.

**Alternatives considered**:

- Add the prompt to individual pages: rejected because it increases duplication and risks inconsistent behavior.
- Add the prompt only to the home page: rejected because visitors may enter the site through other pages.

## Decision: Build the toast CTA with existing Radix Toast and Framer Motion capabilities

**Rationale**: The project already includes Radix Toast and Framer Motion. Radix supports accessible toast semantics and bottom-right viewport behavior, while Framer Motion supports the collapse transition and reduced-motion handling. This satisfies the feature without adding another toast dependency.

**Alternatives considered**:

- Add a new toast library: rejected due to dependency discipline and because existing dependencies are sufficient.
- Build all behavior with custom elements only: rejected because it would require recreating accessibility patterns already covered by existing project dependencies.

## Decision: Use session-scoped display behavior

**Rationale**: The spec assumes the rectangular prompt appears once per visitor session. Session-scoped state prevents the prompt from repeatedly expanding during the same visit while still allowing each new session to discover the resume.

**Alternatives considered**:

- Always show the rectangular prompt on every page load: rejected because it would be more disruptive.
- Permanently remember dismissal across visits: rejected because the resume CTA should remain discoverable in future sessions.

## Decision: Keep the collapsed icon available after the initial prompt collapses

**Rationale**: The collapsed Z icon preserves discoverability while reducing visual weight. This aligns with the success criterion that visitors can reach `/resume` in one click from either prompt state.

**Alternatives considered**:

- Fully hide the prompt after timeout: rejected because it removes the one-click resume path.
- Require an explicit close action only: rejected because it leaves the larger prompt visible too long for uninterested visitors.

## Decision: Implement `/resume` as a static route using the existing titled page layout

**Rationale**: The site already has consistent titled pages using the Base layout. Reusing that pattern satisfies visual consistency and keeps the resume page aligned with the rest of the personal site.

**Alternatives considered**:

- Open the PDF directly in a new tab: rejected because it bypasses the branded page, last-updated note, and analytics context.
- Add the resume to an existing About page: rejected because the feature calls for a dedicated route and clear resume page.

## Decision: Use the owner-requested Syncfusion PDF viewer with a static PDF fallback

**Rationale**: The feature request explicitly names `@syncfusion/ej2-pdfviewer`. The implementation should isolate viewer usage to the resume page and load the existing PDF from `public/static/resume/resume.pdf`. Because the site is statically exported, the viewer must not depend on server-side PDF processing. A fallback direct PDF link preserves user access if the embedded viewer fails, is blocked, or is not compatible in a visitor's browser.

**Alternatives considered**:

- Native browser PDF embed/object only: rejected as the primary approach because the user specifically requested the Syncfusion viewer, but retained as fallback.
- Server-backed PDF rendering: rejected because the constitution requires static export and no server runtime.
- Add a different React PDF package: rejected because it contradicts the requested package and would add an unnecessary dependency.

## Decision: Record non-sensitive engagement through existing Google Analytics when available

**Rationale**: The site already loads Google Analytics. Resume prompt clicks and resume page visits can be recorded as lightweight engagement events when `gtag` is present. The feature must continue to work when analytics are blocked or unavailable.

**Alternatives considered**:

- Add a new analytics package: rejected due to dependency discipline.
- Make analytics required for the feature: rejected because visitor access to the resume must not depend on analytics availability.
- Track detailed document content interactions: rejected unless natively exposed by the viewer and non-sensitive; basic engagement is enough for this feature.

## Decision: Validate with existing lint/build plus focused manual QA

**Rationale**: The constitution favors lightweight testing. Existing project commands validate code quality and static export, while manual checks are appropriate for motion, keyboard behavior, PDF loading, and analytics fallback.

**Alternatives considered**:

- Add full browser end-to-end automation: rejected as too heavy for the project scope without explicit owner approval.
- Skip manual accessibility checks: rejected because keyboard and assistive technology usability are explicit requirements.
