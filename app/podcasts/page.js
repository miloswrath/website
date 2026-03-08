import ListItem from '../../components/ListItem';
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
  const renderFeatured = (items) => {
    const featured = [
      'Getting to production on The Changelog',
      'Why developers trust modern devtools',
      'React.Email and Dracula Theme on DevTools.fm'
    ];

    return items
      .filter((item) => featured.includes(item.title))
      .map((item, index) => {
        return (
          <ListItem
            key={`${item.title}-${item.date}-${index}`}
            index={index}
            href={item.url}
            title={item.title}
            date={item.date}
          />
        );
      });
  };

  const renderEpisode = (items) => {
    return items.map((item, index) => {
      return (
        <ListItem
          key={`${item.title}-${item.date}-${index}`}
          index={index}
          href={item.url}
          title={item.title}
          date={item.date}
        />
      );
    });
  };

  const description = `Audio is a powerful medium and a great way to <strong>debate ideas</strong>. Whenever possible I try to share my story as a guest or <strong>meet new people</strong> by hosting my own podcast called ByteTalk.`;

  return (
    <Base
      title="Podcasts // Zak Gilliam"
      tagline="Ideas. Thoughts. Opinions."
      primaryColor="pink"
      secondaryColor="purple"
    >
    <p>Nothing here <strong>yet</strong>...</p>
    </Base>
  );
}
