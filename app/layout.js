import 'remixicon/fonts/remixicon.css';
import '../public/static/css/prism.css';
import './globals.css';

import localFont from 'next/font/local';

import CommandBar from '../components/CommandBar';
import Template from './template';

const biotif = localFont({
  src: [
    {
      path: '../public/static/fonts/biotif-regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../public/static/fonts/biotif-regular-italic.woff2',
      weight: '400',
      style: 'italic'
    },
    {
      path: '../public/static/fonts/biotif-book.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../public/static/fonts/biotif-bold.woff2',
      weight: '700',
      style: 'normal'
    }
  ],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
  adjustFontFallback: false
});

const neuzeitGroteskBold = localFont({
  src: '../public/static/fonts/neuzeit-grotesk-bold.woff2',
  variable: '--font-display',
  display: 'swap',
  preload: true,
  adjustFontFallback: false
});

const firaCode = localFont({
  src: '../public/static/fonts/fira-code-regular.woff2',
  variable: '--font-mono',
  display: 'swap',
  preload: true,
  adjustFontFallback: false
});

export const metadata = {
  metadataBase: new URL('https://zakgilliam.com'),
  title: {
    default: 'Zak Gilliam',
    template: '%s // Zak Gilliam'
  },
  description: 'Obsessed with developer experience',
  authors: [{ name: 'Zak Gilliam' }],
  openGraph: {
    type: 'website',
    siteName: 'Zak Gilliam'
  },
  twitter: {
    card: 'summary_large_image'
  },
  icons: {
    icon: '/favicon.svg'
  }
};

export const viewport = {
  themeColor: '#08070b'
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-US"
      className={`${biotif.variable} ${neuzeitGroteskBold.variable} ${firaCode.variable} bg-background text-secondary touch-manipulation overscroll-contain font-sans antialiased`}
    >
      <body suppressHydrationWarning>
        <Template>
          <CommandBar>{children}</CommandBar>
        </Template>
      </body>
    </html>
  );
}
