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
  const [isSubListOpen, setIsSubListOpen] = useState(false);

  const navbarRef = useRef<HTMLElement>(null);
  const subListRef = useRef<HTMLUListElement>(null);

  const { width: windowInnerWidth } = useWindowSize();

  const toggleSubListState = () => {
    setIsSubListOpen(!isSubListOpen);
  };

  const subListItemHoverHandler = (event: React.MouseEvent) => {
    if (windowInnerWidth && windowInnerWidth < 1024) return;

    if (event.type === 'mouseenter') {
      setIsSubListOpen(true);
    } else {
      setIsSubListOpen(false);
    }
  };

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
      onComplete: () => {
        setIsTransitioning(false);
        setIsSubListOpen(false);
      },
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

  useEffect(() => {
    if (!subListRef.current) return;

    gsap.to(subListRef.current, {
      height: isSubListOpen ? 'auto' : 0,
      marginBottom: isSubListOpen ? '1rem' : 0,
      autoAlpha: isSubListOpen ? 1 : 0,
      duration: 0.35,
    });
  }, [isSubListOpen]);

  return (
    <nav className={styles.navbar} ref={navbarRef}>
      {navbarLinks.map((item) => {
        return item.subLinks ? (
          <div
            key={item.title}
            className={styles.navbarItemWrapper}
            onMouseEnter={subListItemHoverHandler}
            onMouseLeave={subListItemHoverHandler}
          >
            <button
              className={item.href === activeLinkURL ? styles.active : ''}
              onClick={toggleSubListState}
              type="button"
            >
              {item.title}
            </button>
            <ul className={styles.subList} ref={subListRef}>
              {item.subLinks.map((subLink) => (
                <li key={subLink.title} className={styles.subLinkItem}>
                  <Link
                    className={styles.navbarItem}
                    to={`${item.href}${subLink.href}`}
                    onClick={() => setIsSubListOpen(false)}
                  >
                    {subLink.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <Link
            key={item.title}
            className={classNames(styles.navbarItem, item.href === activeLinkURL && styles.active)}
            to={item.href}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
};
