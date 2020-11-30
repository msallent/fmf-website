import React, { FunctionComponent, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './PageTitle.module.scss';

interface PageTitleProps {
  title: string;
}

export const PageTitle: FunctionComponent<PageTitleProps> = ({ title }) => {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      {
        y: 30,
        autoAlpha: 0,
      },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.35,
      }
    );
  }, []);

  return (
    <div className={styles.pageTitle}>
      <div className={styles.titleWrapper} ref={titleRef}>
        {title}
      </div>
    </div>
  );
};
