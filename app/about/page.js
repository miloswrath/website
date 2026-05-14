import Base from '../../layouts/Base';
import AboutClient from './AboutClient';

export const metadata = {
  title: 'About',
  description:
    'Zak Gilliam is an AI Pioneer and developer based in Greenville, SC.',
  openGraph: {
    title: 'About // Zak Gilliam',
    description:
      'Zak Gilliam is an AI Pioneer at TD SYNNEX based in Greenville, SC.',
    url: 'https://zakgilliam.com/about',
    images: ['/static/images/about-bw.jpg']
  }
};

export default function About() {
  const description =
    'Zak Gilliam is a Greenville, SC-based developer and AI Pioneer at TD SYNNEX, where he designs and builds full-stack AI products that streamline workflows, improve operations, and help teams move faster. He cares deeply about developer experience and shares what he learns through talks, projects, and writing.';

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
