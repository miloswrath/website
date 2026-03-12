# Quickstart: Adding Playlists and Songs

**Feature**: 004-music-playlists (revised — card-based browser)

---

## Adding a New Playlist

Open `data/music.js` and add a new object to the `playlists` array:

```javascript
{
  name: 'Your Playlist Name',
  description: 'A short vibe description (optional, shown on the card).',
  image: '/static/images/playlists/your-image.jpg', // optional — leave out for gradient
  songs: [
    {
      title: 'Song Title',
      artist: 'Artist Name',
      url: 'https://open.spotify.com/track/TRACK_ID?si=...'
    }
    // add more songs...
  ]
}
```

The new playlist will immediately appear as a card on the `/music` page. No other files need to change.

**Finding the Spotify URL**: Open a song in Spotify → Share → Copy Link. The URL format is:
`https://open.spotify.com/track/TRACK_ID?si=SESSION_ID`

---

## Adding a Cover Image

1. Place the image in `public/static/images/playlists/` (create the directory if needed).
2. Reference it in the playlist's `image` field as `'/static/images/playlists/your-image.jpg'`.
3. If no image is provided, the card shows a pink-to-purple gradient placeholder automatically.

---

## Adding a Song to an Existing Playlist

Find the playlist by `name` in `data/music.js` and add to its `songs` array:

```javascript
{ title: 'New Song', artist: 'Artist', url: 'https://open.spotify.com/track/NEWID?si=...' }
```

---

## Song Count

The song count shown on each card is derived automatically from the `songs` array length. No manual count field is needed.

---

## Page Route and Colors

- Route: `/music` (`app/music/page.js`)
- Colors: `primaryColor="pink"`, `secondaryColor="purple"` (edit `app/music/page.js` to change)
- Available colors: `yellow`, `pink`, `purple`, `red`, `orange`, `green`, `cyan`

---

## Opening / Closing Playlists

The card-based browsing and song reveal are handled automatically by `PlaylistBrowser.js`. Clicking a card opens its songs; clicking the same card (or the close control) collapses it. Only one playlist is open at a time.
