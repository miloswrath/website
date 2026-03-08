import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { PostContent, PostMain } from '../components/Post';
import ShortcutHome from '../components/ShortcutHome';
import { Wrapper } from '../components/Wrapper';

export const metadata = {
  title: 'Zak Gilliam',
  description: 'Obsessed with developer experience',
  openGraph: {
    title: 'Zak Gilliam',
    description: 'Obsessed with developer experience',
    url: 'https://zakgilliam.com',
    images: ['/static/images/home-bw.jpg']
  }
};

export default function Index() {
  const title = 'Zak Gilliam';
  const description = '';

  return (
    <Wrapper>
      <Navbar />
      <PostMain className="mx-auto flex items-start md:w-200">
        <PostContent className="mb-5 p-0!">
          <div className="mx-5 mt-64 flex w-full max-w-190 flex-col items-start">
            <h1>{title}</h1>
            <p className="mt-0">
              {description}
            </p>
            <ShortcutHome />
          </div>
        </PostContent>
      </PostMain>
      <Footer />
    </Wrapper>
  );
}
