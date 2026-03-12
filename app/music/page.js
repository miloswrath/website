import PlaylistBrowser from '../../components/PlaylistBrowser';
import { playlists } from '../../data/music';
import Base from '../../layouts/Base';

export const metadata = {
  title: 'Music',
  description: 'Playlists for every mood.',
  openGraph: {
    title: 'Music // Zak Gilliam',
    url: 'https://zakgilliam.com/music',
    images: ['/static/images/podcasts-bw.jpg']
  }
};

export default function Music() {
  return (
    <Base
      title="Music // Zak Gilliam"
      tagline="Sounds for every mood."
      primaryColor="pink"
      secondaryColor="purple"
    >
      <PlaylistBrowser playlists={playlists} />
    </Base>
  );
}
