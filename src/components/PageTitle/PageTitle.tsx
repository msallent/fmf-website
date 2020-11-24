import React, { FunctionComponent } from 'react';
import styles from './PageTitle.module.scss';

interface PageTitleProps {
  title: string;
}

export const PageTitle: FunctionComponent<PageTitleProps> = ({ title }) => (
  <div className={styles.pageTitle}>
    <div className={styles.titleWrapper}>{title}</div>
  </div>
);
