import React, { FunctionComponent } from 'react';
import { socials } from '../../data/socials';
import styles from './Footer.module.scss';

interface FooterProps {
  title: string;
}

export const Footer: FunctionComponent<FooterProps> = ({ title }) => (
  <footer className={styles.footer}>
    <div className={styles.titleWrapper}>
      <span className={styles.trademark}>©</span>
      <span className={styles.title}>{title}</span>
    </div>
    <ul className={styles.socials}>
      {socials.map((social) => (
        <li key={social.title} className={styles.social}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            title={social.title}
            className={styles.socialIconWrapper}
          >
            <social.Component className={styles.socialIcon} />
          </a>
        </li>
      ))}
    </ul>
  </footer>
);
