import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { Link } from 'gatsby';
import { gsap } from 'gsap';
import { navbarLinks } from '../../data/navbarLinks';
import { useWindowSize } from '../../hooks/useWindowSize';
import styles from './Navbar.module.scss';

interface NavbarProps {
  isOpen: boolean;
  currentLocation: Location;
  setIsTransitioning: (state: boolean) => void;
}

export const Navbar: FunctionComponent<NavbarProps> = ({
  isOpen,
  currentLocation,
  setIsTransitioning,
}) => {
  const [activeLinkURL, setActiveLinkURL] = useState('');
  const navbarRef = useRef<HTMLElement>(null);

  const { width: windowInnerWidth } = useWindowSize();

  useEffect(() => {
    const currentLink = navbarLinks.find((link) => currentLocation.pathname.includes(link.href));
    setActiveLinkURL(currentLink?.href || '');
  }, [currentLocation]);

  useEffect(() => {
    if (!navbarRef.current || !windowInnerWidth) return;

    if (windowInnerWidth >= 1024) {
      gsap.set(navbarRef.current, { clearProps: 'all' });
      gsap.to(navbarRef.current.children, { autoAlpha: 1, clearProps: 'all' });
      return;
    }

    gsap.to(navbarRef.current, {
      height: isOpen ? 'auto' : 0,
      marginTop: isOpen ? '2rem' : 0,
      duration: isOpen ? 0.5 : 0.35,
      onStart: () => setIsTransitioning(true),
      onComplete: () => setIsTransitioning(false),
    });

    gsap.fromTo(
      navbarRef.current.children,
      {
        x: isOpen ? -10 : 0,
        autoAlpha: isOpen ? 0 : 1,
      },
      {
        x: 0,
        autoAlpha: isOpen ? 1 : 0,
        stagger: isOpen ? 0.1 : 0,
        duration: isOpen ? 0.5 : 0.1,
      }
    );
  }, [isOpen, setIsTransitioning, windowInnerWidth]);

  return (
    <nav className={styles.navbar} ref={navbarRef}>
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
  );
};
