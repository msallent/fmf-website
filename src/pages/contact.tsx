import React, { FunctionComponent } from 'react';
import { PageProps } from 'gatsby';
import { PageTitle } from '../components/PageTitle';
import styles from '../style/pages/contact.module.scss';

const Contact: FunctionComponent<PageProps> = () => (
  <main>
    <PageTitle title="Contact" />
    <div className={styles.bannerWrapper}>
      <img className={styles.banner} src="/images/contact.jpg" alt="Contact" />
    </div>
    <div className="container">
      <p className={styles.paragraph}>
        <strong>Inquiries for projects</strong>
      </p>
      <p className={styles.paragraph}>Federico Mariano Franco</p>
      <ul className={styles.list}>
        <li className={styles.listItem}>Music Composition & Production</li>
        <li className={styles.listItem}>Sound Design</li>
        <li className={styles.listItem}>Mixing & Mastering</li>
      </ul>
      <p className={styles.paragraph}>fmfcreativeaudio@gmail.com</p>
    </div>
  </main>
);

export default Contact;
