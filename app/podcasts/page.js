import Base from '../../layouts/Base';

export const metadata = {
  title: 'Podcasts',
  description:
    'Audio is a powerful medium and a great way to debate ideas. Whenever possible I try to share my story as a guest or meet new people by hosting my own podcast called ByteTalk.',
  openGraph: {
    title: 'Podcasts // Zak Gilliam',
    url: 'https://zakgilliam.com/podcasts',
    images: ['/static/images/podcasts-bw.jpg']
  }
};

export default function Podcasts() {
  return (
    <Base
      title="Podcasts // Zak Gilliam"
      tagline="Ideas. Thoughts. Opinions."
      primaryColor="pink"
      secondaryColor="purple"
    >
      <p>
        Nothing here <strong>yet</strong>...
      </p>
    </Base>
  );
}
