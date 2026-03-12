# Feature Spec -> Changing podcasts section to be about my music taste.

---

## Goal

---

I don't really do podcasts so showcasing my music taste would be better.
I would like to sort of have "playlists" where vibes and songs are immediately visible, with longer playlists getting songs hidden for consistency

## Requirements

- remove the current logic for podcasts
- change the reading of js arrays and the expected logic to match this vibe more, with separate arrays for different playlists
- include name, description, songs: song name, artist, link
- include a SMALL spotify embed for all songs
- create an example array with the following info:

playlist name: Trance Working
desc: For when you want to shuffle your hips in your desk chair.
songs:
Anthem - HDMIRROR - https://open.spotify.com/track/6MVreup4Uks32b9dO05gHs?si=e9d4e070b1bd4195
Xxoplex - A.G. Cook - https://open.spotify.com/track/7I3fl9WpFpNEdSNvxtl803?si=7dfdd61843404c1f
Needs - Security Wing - https://open.spotify.com/track/141hMmmdplTqLcgf8H7wZo?si=5e1d35d9a0564843

embeds look like this:
`<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/7I3fl9WpFpNEdSNvxtl803?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
