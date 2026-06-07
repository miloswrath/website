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
    'Zak Gilliam is an AI engineer based in Greenville, SC. He is currently an AI Pioneer at TD SYNNEX, where he builds tools and infrastructure to drive an increase in margin for TD SYNNEX\'s largest business, Cisco. Zak is passionate about improving the developer experience and sharing knowledge with the community through talks, projects, and writing.';

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