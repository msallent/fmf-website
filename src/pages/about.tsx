import React, { FunctionComponent } from 'react';
import { Link, PageProps } from 'gatsby';
import classNames from 'classnames';
import { PageTitle } from '../components/PageTitle';
import styles from '../style/pages/about.module.scss';

const About: FunctionComponent<PageProps> = () => (
  <main>
    <PageTitle title="About" />
    <div className="container">
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
        <Link to="/albums" className={styles.underlined}>
          Albums
        </Link>{' '}
        section and don&apos;t hesitate to contact me.
      </p>
      <p className={classNames(styles.paragraph, styles.greetings)}>
        <strong>Say hi!</strong>
      </p>
    </div>
  </main>
);

export default About;
