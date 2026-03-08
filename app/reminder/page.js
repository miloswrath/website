import { Box } from '../../components/Box';
import Base from '../../layouts/Base';

export const metadata = {
  title: 'Reminder',
  description:
    'Time is the most important asset. Time does not equal money. Time equals life. And you only have one chance to make it right.',
  openGraph: {
    title: 'Reminder // Zak Gilliam',
    url: 'https://zakgilliam.com/reminder',
    images: ['/static/images/reminder-bw.jpg']
  }
};

export default function Reminder() {
  return (
    <Base
      title="Reminder // Zak Gilliam"
      tagline="Tick-tock. Tick-tock."
      primaryColor="cyan"
      secondaryColor="green"
    >
      <Box className="text-justify">
        <p>
          <strong>Time is the most important asset.</strong>
        </p>
      </Box>
    </Base>
  );
}
