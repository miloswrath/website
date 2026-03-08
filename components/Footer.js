import Link from 'next/link';

const FOOTER_LINKS = [
  {
    title: 'Twitter',
    url: 'https://x.com/HankHil70702293',
    icon: 'ri-twitter-line'
  },
  {
    title: 'GitHub',
    url: 'https://github.com/miloswrath',
    icon: 'ri-github-line'
  },
  {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/zachary-gilliam-1aa18720b',
    icon: 'ri-linkedin-line'
  },
  {
    title: 'Instagram',
    url: 'https://instagram.com/zak.gilliam',
    icon: 'ri-instagram-line'
  }
];

const LINK_CLASS =
  'text-secondary hover:text-primary focus:text-primary ml-5 flex items-center border-0 text-[0.9375rem] leading-none lowercase no-underline transition-[color_0.2s_ease-in-out] first:ml-0 hover:opacity-100 focus:opacity-100 [&:hover_i]:opacity-100 [&:hover_i]:transition-[opacity_0.2s_ease-in-out]';

const FooterLink = ({ title, url, icon }) => {
  const content = (
    <>
      <span className="hidden md:block">{title}</span>
      <i
        className={`${icon} text-primary mt-0.25 ml-1.25 text-2xl leading-none opacity-100 md:text-base md:opacity-0`}
      />
    </>
  );

  const isExternal = url.startsWith('http');

  if (isExternal) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={LINK_CLASS}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={url} className={LINK_CLASS}>
      {content}
    </Link>
  );
};

export default function Footer() {
  return (
    <footer className="bg-background flex items-center justify-center py-5">
      {FOOTER_LINKS.map((link) => (
        <FooterLink key={link.url} {...link} />
      ))}
    </footer>
  );
}
