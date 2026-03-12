import Base from '../../layouts/Base';
import AboutClient from './AboutClient';

export const metadata = {
  title: 'About',
  description: 'Zak is a developer',
  openGraph: {
    title: 'About // Zak Gilliam',
    description: 'Zak Gilliam is a developer based in Iowa.',
    url: 'https://zakgilliam.com/about',
    images: ['/static/images/about-bw.jpg']
  }
};

export default function About() {
  const description =
    'Zak Gilliam is a developer based in Iowa. He is currently the Lead Developer for Data Platform & AI Systems at HBC Lab, where he builds tools and infrastructure to support research in psychology and neuroscience. Zak is passionate about improving the developer experience and sharing knowledge with the community through talks, projects, and writing.';

  return (
    <Base
      title="About // Zak Gilliam"
      tagline="Listen. Learn. Build."
      primaryColor="pink"
      secondaryColor="purple"
    >
      <AboutClient description={description} />
    </Base>
  );
}
