# Feature Specification: Music Playlists Section

**Feature Branch**: `004-music-playlists`
**Created**: 2026-03-12
**Revised**: 2026-03-12
**Status**: Revised — UX redesign to address scrolling problem
**Input**: Original: "Change podcasts section to music taste playlists with Spotify embeds" | Revision: "Make playlists into clickable cards; clicking opens songs in a focused view"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Browse Playlist Cards (Priority: P1)

A visitor navigates to the music section and immediately sees all available playlists as compact browsable cards. Each card communicates the playlist's name, vibe description, a representative visual, and how many songs it contains — all without requiring any scrolling through song lists.

**Why this priority**: The original design caused excessive scrolling because all songs across all playlists were rendered inline. Cards solve this by hiding song detail until the visitor chooses to engage with a specific playlist.

**Independent Test**: Can be fully tested by loading the `/music` page and confirming each playlist appears as a card showing name, description, song count, and visual — with no song embeds or track listings visible at this level.

**Acceptance Scenarios**:

1. **Given** a visitor opens the music page, **When** the page loads, **Then** they see one card per playlist, each displaying the playlist name, description, song count, and a representative image or visual.
2. **Given** multiple playlists exist, **When** the page loads, **Then** all playlist cards are visible without requiring the visitor to scroll through any song listings.
3. **Given** a playlist has no description, **When** its card is displayed, **Then** the card still renders correctly with name, song count, and visual — description is omitted gracefully.

---

### User Story 2 - Open a Playlist to Browse Songs (Priority: P2)

A visitor sees a playlist card they're interested in and clicks it to reveal the full song listing with inline Spotify embeds for that playlist — without navigating away from the music page.

**Why this priority**: This is the core interaction that replaces the old always-expanded layout. The focused song view must feel intentional and easy to read, unlike the previous wall of embeds.

**Independent Test**: Can be fully tested by clicking a single playlist card and verifying the songs and their embeds become visible in a clearly delineated, readable layout. Clicking again (or a close/back control) collapses the view.

**Acceptance Scenarios**:

1. **Given** a playlist card is displayed, **When** a visitor clicks it, **Then** the songs for that playlist become visible with each song showing its title, artist name, and a compact Spotify embed.
2. **Given** a playlist song view is open, **When** the visitor clicks the play button on any Spotify embed, **Then** the song plays inline without leaving the page.
3. **Given** a playlist song view is open, **When** a visitor clicks the card or a close control, **Then** the song listing collapses and the card-browsing view is restored.
4. **Given** one playlist is already open, **When** a visitor clicks a different playlist card, **Then** the previously open playlist closes and the newly selected playlist's songs become visible.

---

### User Story 3 - Scan Song Count and Vibe Before Committing (Priority: P3)

A visitor can judge whether a playlist is worth opening by reading its description and song count on the card, choosing whether to engage further without needing to scroll through its songs first.

**Why this priority**: The card format only delivers value if the information on it is sufficient to make a decision. Song count and description together communicate the playlist's scope and mood at a glance.

**Independent Test**: Can be fully tested by reading a playlist card and verifying the song count matches the actual number of songs revealed when the playlist is opened.

**Acceptance Scenarios**:

1. **Given** a playlist card is shown, **When** a visitor reads it, **Then** the displayed song count accurately reflects the number of songs in that playlist.
2. **Given** a playlist with a long description, **When** its card is displayed, **Then** the description is shown in a way that does not cause the card to dominate or overflow the layout.

---

### Edge Cases

- What happens when a Spotify embed URL is invalid or the track is unavailable? The embed displays Spotify's native unavailable state — no custom error handling required.
- What if a playlist has only one song? The card shows "1 song" and clicking it reveals that single track normally.
- What if a playlist has no image provided? A neutral placeholder visual is shown — the card layout must remain intact without a custom image.
- What if a visitor opens a playlist and then navigates back and forth on the page? The open/closed state resets to all-closed on each page load (no persistence required).

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The podcasts section MUST be removed and replaced with a music playlists section. _(carried over)_
- **FR-002**: The music section MUST support multiple named playlists, each with a name, description, song count, optional cover image, and list of songs.
- **FR-003**: The music page MUST display playlists as a browsable set of cards — no song listings or embeds visible at the card level.
- **FR-004**: Each playlist card MUST show: playlist name, description (if present), song count, and a representative visual (cover image or placeholder).
- **FR-005**: Clicking a playlist card MUST reveal that playlist's songs in a focused, readable layout directly on the music page.
- **FR-006**: The focused song view MUST display each song's title, artist name, and a compact Spotify embed.
- **FR-007**: Only one playlist's songs may be visible at a time; opening a second playlist MUST close the previously open one.
- **FR-008**: A mechanism MUST exist to close the open playlist and return to the card-browsing view.
- **FR-009**: Song data MUST be defined in a structured format per playlist (name, description, optional cover image, songs array with title, artist, Spotify URL). _(updated from FR-004)_
- **FR-010**: Spotify embeds MUST use the compact embed format (height 152px, border-radius styling, lazy loading). _(carried over from FR-008)_
- **FR-011**: The existing playlist content (including "Working to Trance" and "Slightly Sad, but not too much") MUST be preserved and displayed correctly under the new card layout.

### Key Entities

- **Playlist**: A named, vibe-themed collection. Attributes: name, description (optional), cover image (optional), ordered list of songs.
- **Song**: A single track within a playlist. Attributes: song title, artist name, Spotify track URL (embed derived from URL at display time).

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: All playlists are visible as cards on initial page load with zero song embeds rendered — verified by visual inspection.
- **SC-002**: Clicking any playlist card reveals its songs and embeds within the same page view, with no full-page navigation.
- **SC-003**: The music page can be fully scanned (all playlist cards visible) without scrolling past one viewport height on a standard desktop screen.
- **SC-004**: Each playlist card accurately displays the correct song count matching its actual song list.
- **SC-005**: Every song in an opened playlist has a functional Spotify embed that loads and allows inline playback.
- **SC-006**: No podcast-related content or data structures remain visible anywhere in the music section.

## Assumptions

- Playlists are static content defined in data arrays — no dynamic loading or backend required.
- The "focused song view" when a card is clicked is an inline expand/accordion on the same page — not a modal dialog or a separate sub-page. This preserves simplicity and avoids routing complexity.
- Playlist cover images are optional; the data structure gains an optional `image` field. If omitted, a consistent placeholder is used.
- Song count on each card is derived from the `songs` array length at display time — no separate count field needed.
- The Spotify embed format is fixed at compact height (152px); no embed size customization is in scope.
