interface NavbarLink {
  title: string;
  href: string;
  subLinks?: Array<NavbarLink>;
}

export const navbarLinks: Array<NavbarLink> = [
  {
    title: 'Albums',
    href: '/albums',
    subLinks: [
      {
        title: 'World Music Album',
        href: '/world-music-album',
      },
    ],
  },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
];
