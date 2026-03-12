'use client';

import { useState } from 'react';

import { HoverAnimation } from './HoverAnimation';

function getEmbedUrl(spotifyUrl) {
  const url = new URL(spotifyUrl);
  const trackId = url.pathname.split('/').pop();
  return `https://open.spotify.com/embed/track/${trackId}?utm_source=generator`;
}

export default function PlaylistBrowser({ playlists }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {playlists.map((playlist, i) => {
          const count = playlist.songs.length;
          const isOpen = openIndex === i;

          return (
            <button
              key={playlist.name}
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="group w-full border-0 bg-transparent text-left"
            >
              <HoverAnimation
                id={i}
                layoutId="playlistCards"
                className="relative block w-full p-4"
              >
                <div className="mb-4 overflow-hidden rounded-xl">
                  <div
                    className="aspect-[4/3] w-full bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: playlist.image
                        ? `url(${playlist.image})`
                        : 'linear-gradient(135deg, #ff80bf 0%, #9580ff 100%)'
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-primary m-0">{playlist.name}</h3>
                  {playlist.description && (
                    <p className="text-secondary m-0 line-clamp-2">
                      {playlist.description}
                    </p>
                  )}
                  <p className="text-primary my-1.25 mt-1.25 inline-block text-xs font-medium tracking-[0.075rem] uppercase">
                    {count} {count === 1 ? 'song' : 'songs'}
                  </p>
                </div>
              </HoverAnimation>
            </button>
          );
        })}
      </div>

      {openIndex !== null && (
        <div className="mt-8 -ml-5 w-[calc(100%+2.5rem)] px-5">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-primary m-0">{playlists[openIndex].name}</h2>
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              className="text-secondary hover:text-primary cursor-pointer border-none bg-transparent p-0 text-sm transition-colors duration-200"
            >
              Close ↑
            </button>
          </div>
          <ul className="m-0 list-none p-0">
            {playlists[openIndex].songs.map((song, idx) => (
              <li
                key={`${song.title}-${idx}`}
                className="border-hover border-b py-6 last:border-0"
              >
                <p className="text-primary mb-0.5 leading-6 font-bold">
                  {song.title}
                </p>
                <p className="text-secondary mb-3 text-sm">{song.artist}</p>
                <iframe
                  data-testid="embed-iframe"
                  style={{ borderRadius: '12px' }}
                  src={getEmbedUrl(song.url)}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
