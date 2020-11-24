import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import { navbarLinks } from '../../data/navbarLinks';
import styles from './Header.module.scss';

interface HeaderProps {
  title: string;
  currentLocation: Location;
}

export const Header: FunctionComponent<HeaderProps> = ({ title, currentLocation }) => {
  const [activeLinkURL, setActiveLinkURL] = useState('');

  useEffect(() => {
    const currentLink = navbarLinks.find((link) => currentLocation.pathname.includes(link.href));
    setActiveLinkURL(currentLink?.href || '');
  }, [currentLocation]);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.title}>
        {title}
      </Link>
      <nav className={styles.navbar}>
        {navbarLinks.map((item) => (
          <Link
            key={item.title}
            className={classNames(styles.navbarItem, item.href === activeLinkURL && styles.active)}
            to={item.href}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </header>
  );
};
