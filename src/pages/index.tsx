import React, { FunctionComponent } from 'react';
import { PageProps } from 'gatsby';
import { PageTitle } from '../components/PageTitle';
import styles from '../style/pages/index.module.scss';

const Index: FunctionComponent<PageProps> = () => (
  <main>
    <PageTitle title="Creative Audio Producer" />
    <div className="container">
      <p className={styles.paragraph}>I make original sound and music for commercial use.</p>
      <img src="https://via.placeholder.com/1000x450" alt="Placeholder" width="1000" height="450" />
    </div>
  </main>
);

export default Index;
