# Data Model: Resume Toast

## Entity: Resume Prompt

**Purpose**: Represents the visitor-facing call-to-action that promotes Zak's resume.

**Fields**:

- `state`: Current prompt state; one of `expanded`, `collapsed`, or `hidden-on-resume-page`.
- `message`: Visitor-facing text inviting the visitor to view Zak's resume.
- `placement`: Fixed visual location; bottom-right viewport area.
- `destination`: Resume page path; `/resume`.
- `hasExpandedThisSession`: Whether the full rectangular prompt has already been shown during the current browser session.
- `collapseDelaySeconds`: Time before the expanded prompt collapses when not clicked; must be no more than 10 seconds.

**Validation Rules**:

- `destination` must resolve to `/resume`.
- `state` must always leave the resume route reachable unless the visitor is already on `/resume`.
- `message` must clearly communicate that clicking opens Zak's resume.
- `collapseDelaySeconds` must satisfy the success criterion of collapsing within 10 seconds.
- Prompt controls must have accessible names in both expanded and collapsed states.

**State Transitions**:

```text
new session on non-resume page -> expanded
expanded + timeout without click -> collapsed
expanded + click -> navigate to /resume
collapsed + click -> navigate to /resume
any state + visitor on /resume -> hidden-on-resume-page
new browser session -> expanded
```

## Entity: Resume Document

**Purpose**: Represents Zak's resume asset displayed on the resume page.

**Fields**:

- `title`: Human-readable title for the page, e.g. "Zak Gilliam's Resume".
- `assetPath`: Public path to the PDF document; `/static/resume/resume.pdf`.
- `lastUpdatedLabel`: Visitor-facing note indicating when the resume was last updated.
- `viewerState`: Current display state; one of `loading`, `ready`, or `fallback`.
- `fallbackUrl`: Direct link to the PDF asset.

**Validation Rules**:

- `assetPath` and `fallbackUrl` must point to an accessible public PDF asset.
- `lastUpdatedLabel` must be visible near the page title.
- `viewerState=fallback` must show a friendly message and direct PDF access.
- The resume page must remain useful if embedded viewing fails.

**State Transitions**:

```text
page load -> loading
loading + viewer loads document -> ready
loading + viewer/document error -> fallback
ready + later viewer error -> fallback
```

## Entity: Resume Engagement Event

**Purpose**: Represents non-sensitive analytics signals for resume discovery and viewing.

**Fields**:

- `eventName`: Engagement action name, such as `resume_prompt_click`, `resume_icon_click`, `resume_page_view`, or `resume_viewer_interaction`.
- `source`: Interaction source, such as `expanded_prompt`, `collapsed_icon`, `direct_route`, or `viewer`.
- `occurredAt`: Time the event happened.
- `analyticsAvailable`: Whether the existing analytics function was available at event time.

**Validation Rules**:

- Events must never block navigation or resume viewing.
- Events must not include resume content or sensitive visitor information.
- If analytics are unavailable, the event is skipped without showing an error to the visitor.
- Prompt-click events must distinguish expanded prompt clicks from collapsed icon clicks when possible.

## Relationships

- A Resume Prompt navigates to one Resume Document page.
- A Resume Document page may emit Resume Engagement Events.
- A Resume Prompt may emit Resume Engagement Events before navigation.
