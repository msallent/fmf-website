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
        <Link to="/albums/world-music-album" className={styles.title}>
          {title}
        </Link>
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
