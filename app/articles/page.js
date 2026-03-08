import FeaturedArticle from '../../components/FeaturedArticle';
import { ListGroup } from '../../components/ListGroup';
import ListItem from '../../components/ListItem';
import Base from '../../layouts/Base';
import { getAllPosts, getPostBySlug } from '../../lib/blog';

export const metadata = {
  title: 'Articles',
  description:
    'Here you can find all the articles I wrote. ',
  openGraph: {
    title: 'Articles // Zak Gilliam',
    url: 'https://zakgilliam.com/articles',
    images: ['/static/images/articles-bw.jpg']
  }
};

export default async function Articles() {
  const allPosts = getAllPosts(['date', 'skip', 'slug', 'title']);

  const featuredParams = [
    'date',
    'slug',
    'title',
    'image',
    'content',
    'description'
  ];

  const featuredPosts = [
    getPostBySlug('article-1', featuredParams),
  ];

  const description = `Here you can find all the <strong>${allPosts.length} articles</strong> I wrote.`;

  const renderFeatured = () => {
    return featuredPosts.map((post, index) => {
      return (
        <FeaturedArticle
          key={post.slug}
          index={index}
          href={`/${post.slug}/`}
          title={post.title}
          description={post.description}
          image={post.image}
          stats={post.stats}
          content={post.content}
        />
      );
    });
  };

  const renderAll = () => {
    return allPosts
      .filter((post) => !post.skip)
      .map((post, index) => {
        return (
          <ListItem
            key={post.slug}
            index={index}
            href={`/${post.slug}/`}
            title={post.title}
            date={post.date}
          />
        );
      });
  };

  return (
    <Base
      title="Articles // Zak Gilliam"
      tagline="Stories. Updates. Guides."
      primaryColor="yellow"
      secondaryColor="pink"
    >
      <p dangerouslySetInnerHTML={{ __html: description }} />
      <h2>Featured Articles</h2>
      <div className="my-2.5 mt-2.5 -ml-5 md:flex md:w-[calc(100%+3.375rem)] md:justify-between">
        {renderFeatured()}
      </div>
      <h2>All Articles</h2>
      <ListGroup>{renderAll()}</ListGroup>
    </Base>
  );
}
