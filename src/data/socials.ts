import { FunctionComponent } from 'react';
import { ReactComponent as Facebook } from '../assets/svg/facebook.svg';
import { ReactComponent as Twitter } from '../assets/svg/twitter.svg';
import { ReactComponent as Instagram } from '../assets/svg/instagram.svg';
import { ReactComponent as WhatsApp } from '../assets/svg/whatsapp.svg';
import { ReactComponent as LinkedIn } from '../assets/svg/linkedin.svg';

interface Social {
  title: string;
  href: string;
  Component: FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export const socials: Array<Social> = [
  { title: 'Facebook', href: 'https://facebook.com', Component: Facebook },
  { title: 'Twitter', href: 'https://twitter.com', Component: Twitter },
  { title: 'Instagram', href: 'https://instagram.com', Component: Instagram },
  { title: 'WhatsApp', href: 'https://whatsapp.com', Component: WhatsApp },
  { title: 'LinkedIn', href: 'https://linkedin.com', Component: LinkedIn },
];
