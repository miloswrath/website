import Base from '../../layouts/Base';
import AboutClient from './AboutClient';

export const metadata = {
  title: 'About',
  description:
    "Zak is a developer",
  openGraph: {
    title: 'About // Zak Gilliam',
    description:
      "Zak Gilliam is a developer based in Iowa.",
    url: 'https://zakgilliam.com/about',
    images: ['/static/images/about-bw.jpg']
  }
};

export default function About() {
  const description =
    "Zak Gilliam is a developer based in Iowa.";

  return (
    <Base
      title="About // Zak Gilliam"
      tagline="Create. Share. Repeat."
      primaryColor="pink"
      secondaryColor="purple"
    >
      <AboutClient description={description} />
    </Base>
  );
}
