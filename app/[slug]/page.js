import { ArticleJsonLd } from 'next-seo';
import { notFound } from 'next/navigation';

import { CustomMDX } from '../../components/shared/mdx';
import Blogpost from '../../layouts/Blogpost';
import { getPostBySlug, getPostSlugs } from '../../lib/blog';

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return [...new Set(slugs)]
    .filter((slug) => typeof slug === 'string' && slug && slug !== 'undefined')
    .map((slug) => ({
      slug
    }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;

  if (!slug || slug === 'undefined') {
    return {
      title: 'Not Found'
    };
  }

  try {
    const post = getPostBySlug(slug, [
      'title',
      'description',
      'image',
      'date',
      'canonical_url',
      'lang'
    ]);

    if (!post) {
      notFound();
    }

    const title = `${post.title} // Zak Gilliam`;
    const description = post.description || '';
    const url = `https://zakgilliam.com/${slug}`;
    const image = post.image
      ? `https://zakgilliam.com${post.image}`
      : 'https://zakgilliam.com/static/images/home-opt.jpg';

    return {
      title: post.title,
      description,
      openGraph: {
        title,
        description,
        url,
        images: [image],
        type: 'article',
        publishedTime: new Date(post.date).toISOString(),
        modifiedTime: new Date(post.date).toISOString(),
        authors: ['Zak Gilliam']
      },
      alternates: post.canonical_url
        ? {
            canonical: post.canonical_url
          }
        : undefined
    };
  } catch (error) {
    return {
      title: 'Not Found'
    };
  }
}

export default async function Post({ params }) {
  const { slug } = await params;

  if (!slug || slug === 'undefined') {
    notFound();
  }

  let post;

  try {
    post = getPostBySlug(slug, [
      'canonical_url',
      'content',
      'date',
      'description',
      'image',
      'lang',
      'slug',
      'title'
    ]);
  } catch (error) {
    notFound();
  }

  if (!post) {
    notFound();
  }

  const title = `${post.title} // Zak Gilliam`;
  const url = `https://zakgilliam.com/${post.slug}`;
  const date = new Date(post.date).toISOString();
  const image = post.image
    ? `https://zakgilliam.com${post.image}`
    : 'https://zakgilliam.com/static/images/home-opt.jpg';

  return (
    <>
      <ArticleJsonLd
        authorName="Zak Gilliam"
        type="Blog"
        url={url}
        title={title}
        images={[image]}
        datePublished={date}
        dateModified={date}
        description={post.description}
      />
      <Blogpost title={post.title} image={post.image} date={post.date}>
        <CustomMDX source={post.content || ''} format="md" />
      </Blogpost>
    </>
  );
}
