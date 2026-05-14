import Base from '../../layouts/Base';
import ResumeViewer from './ResumeViewer';

export const metadata = {
  title: 'Resume',
  description:
    'Resume of Zak Gilliam — AI Pioneer and developer based in Greenville, SC.',
  openGraph: {
    title: 'Resume // Zak Gilliam',
    description:
      'Resume of Zak Gilliam — AI Pioneer and developer based in Greenville, SC.',
    url: 'https://zakgilliam.com/resume'
  }
};

export default function ResumePage() {
  return (
    <Base
      title="Resume // Zak Gilliam"
      tagline="Resume"
      primaryColor="cyan"
      secondaryColor="green"
    >
      <p className="text-secondary -mt-2 mb-8 text-sm">
        Last updated: May 2026
      </p>
      <ResumeViewer />
    </Base>
  );
}
