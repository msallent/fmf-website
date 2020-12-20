import React, { FunctionComponent } from 'react';
import { Link, PageProps } from 'gatsby';
import classNames from 'classnames';
import { PageTitle } from '../components/PageTitle';
import styles from '../style/pages/about.module.scss';

const About: FunctionComponent<PageProps> = () => (
  <main>
    <PageTitle title="About" />
    <div className={classNames('container', styles.contentWrapper)}>
      <img className={styles.portrait} src="/images/about.jpg" alt="About" />
      <div className={styles.content}>
        <p className={styles.paragraph}>Hi, my name is Federico Mariano Franco.</p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            Music Composer and Sound Designer from Buenos Aires, Argentina.
          </li>
          <li className={styles.listItem}>
            Graduated Audiovisual Designer from Universidad de Palermo.
          </li>
          <li className={styles.listItem}>
            Passionate about making things sound as good as possible.
          </li>
        </ul>
        <p className={styles.paragraph}>
          Check out some of my music in the{' '}
          <Link to="/albums/world-music-album" className={styles.underlined}>
            Albums
          </Link>{' '}
          section and don&apos;t hesitate to{' '}
          <Link to="/contact" className={styles.underlined}>
            contact me
          </Link>
          .
        </p>
      </div>
    </div>
  </main>
);

export default About;
