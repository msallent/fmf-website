import { FunctionComponent } from 'react';
import { ReactComponent as Instagram } from '../assets/svg/instagram.svg';

interface Social {
  title: string;
  href: string;
  Component: FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export const socials: Array<Social> = [
  {
    title: 'Instagram',
    href: 'https://instagram.com/fmf.creative.audio',
    Component: Instagram,
  },
];
