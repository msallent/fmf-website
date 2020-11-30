interface NavbarLink {
  title: string;
  href: string;
}

export const navbarLinks: Array<NavbarLink> = [
  { title: 'Albums', href: '/albums' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
];
