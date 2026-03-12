# Data Model: Music Playlists Section (Revised)

**Feature**: 004-music-playlists
**Date**: 2026-03-12 — updated for card-based UX redesign

---

## Entities

### Playlist

Represents a named, vibe-themed collection of songs, displayed as a card on the music page.

| Field         | Type   | Required | Description                                                                                                        |
| ------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `name`        | string | Yes      | Display name of the playlist (e.g., "Working to Trance")                                                           |
| `description` | string | No       | Short mood/vibe description shown on the card (capped at 2 lines)                                                  |
| `image`       | string | No       | Path to a cover image (e.g., `'/static/images/playlists/trance.jpg'`). If absent, a gradient placeholder is shown. |
| `songs`       | Song[] | Yes      | Ordered list of songs in this playlist (min: 1)                                                                    |

### Song

Represents a single track within a playlist. Unchanged from v1.

| Field    | Type   | Required | Description                                                                 |
| -------- | ------ | -------- | --------------------------------------------------------------------------- |
| `title`  | string | Yes      | Song name as it appears on Spotify                                          |
| `artist` | string | Yes      | Artist or band name                                                         |
| `url`    | string | Yes      | Full Spotify track URL (e.g., `https://open.spotify.com/track/[ID]?si=...`) |

---

## Derived Values

**Song count**: Derived at render time from `playlist.songs.length` — displayed on the card as e.g. "5 songs".

**Spotify embed src**: Derived at render time from `song.url`:

```
Input:  https://open.spotify.com/track/7I3fl9WpFpNEdSNvxtl803?si=abc
Output: https://open.spotify.com/embed/track/7I3fl9WpFpNEdSNvxtl803?utm_source=generator
```

Transformation: extract track ID from path, construct embed URL with `?utm_source=generator`.

---

## Data File Location

**File**: `data/music.js`
**Export**: named export `playlists` (array of Playlist objects)

---

## Example Data

```javascript
const playlists = [
  {
    name: 'Working to Trance',
    description:
      'For when you no longer want to fight urge to move your hips in your desk chair.',
    image: '/static/images/playlists/trance.jpg', // optional
    songs: [
      {
        title: 'Anthem',
        artist: 'HDMIRROR',
        url: 'https://open.spotify.com/track/6MVreup4Uks32b9dO05gHs?si=...'
      },
      {
        title: 'Xxoplex',
        artist: 'A.G. Cook',
        url: 'https://open.spotify.com/track/7I3fl9WpFpNEdSNvxtl803?si=...'
      }
      // ...
    ]
  },
  {
    name: 'Slightly Sad, but not too much',
    description: "Melancholic music that won't completely ruin the vibe.",
    // no image — gradient placeholder used
    songs: [
      {
        title: 'Believe',
        artist: 'venturing',
        url: 'https://open.spotify.com/track/3QPn2djEjTo0QFg083VIeV?si=...'
      }
      // ...
    ]
  }
];

export { playlists };
```

---

## Client-Side State (PlaylistBrowser)

| State Field | Type           | Default | Description                                                                                   |
| ----------- | -------------- | ------- | --------------------------------------------------------------------------------------------- |
| `openIndex` | number \| null | `null`  | Index of the currently open playlist. `null` means all playlists are closed (card-only view). |

**State transitions**:

- Click closed card at index `i` → `openIndex = i`
- Click open card at index `i` (same card) → `openIndex = null`
- Click closed card at index `j` when `i` is open → `openIndex = j` (previous closes automatically)
- Click close control → `openIndex = null`

---

## Changes from v1 Data Model

| Field              | v1                                      | v2                                             |
| ------------------ | --------------------------------------- | ---------------------------------------------- |
| `image`            | not present                             | optional string (cover art path)               |
| Client state       | `expanded: boolean` per PlaylistSection | `openIndex: number \| null` in PlaylistBrowser |
| Collapse threshold | 3 songs                                 | N/A — removed                                  |
