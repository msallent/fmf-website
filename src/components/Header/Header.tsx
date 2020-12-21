import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import styles from './Header.module.scss';
import { Navbar } from '../Navbar';

interface HeaderProps {
  title: string;
  currentLocation: Location;
}

export const Header: FunctionComponent<HeaderProps> = ({ title, currentLocation }) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const setPageTitle = () => {
    const splitTitle = title.split(' ');
    return `<strong>${splitTitle[0]}</strong> ${splitTitle[1]} ${splitTitle[2]}`;
  };

  const toggleNavbarState = () => {
    if (isTransitioning) return;
    setIsNavbarOpen(!isNavbarOpen);
  };

  useEffect(() => {
    setIsNavbarOpen(false);
    setIsTransitioning(false);
  }, [currentLocation]);

  return (
    <header className={styles.header}>
      <div className={styles.headerRow}>
        <Link
          to="/work"
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: setPageTitle() }}
        />
        <button
          className={classNames(styles.navbarToggle, isNavbarOpen && styles.isOpen)}
          type="button"
          aria-label="Toggle Navbar"
          onClick={toggleNavbarState}
        />
      </div>
      <Navbar
        isOpen={isNavbarOpen}
        currentLocation={currentLocation}
        setIsTransitioning={setIsTransitioning}
      />
    </header>
  );
};
