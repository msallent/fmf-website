import React, { FunctionComponent } from 'react';
import { graphql, PageProps, useStaticQuery } from 'gatsby';
import { SEO } from '../SEO';
import { Header } from '../Header';
import { Footer } from '../Footer';
import '../../style/main.scss';
import 'normalize.css';

export type LayoutProps = Omit<PageProps, 'children'>;

interface LayoutData {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

export const Layout: FunctionComponent<LayoutProps> = ({ children, location }) => {
  const {
    site: {
      siteMetadata: { title },
    },
  } = useStaticQuery<LayoutData>(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );

  return (
    <>
      <SEO location={location} />
      <Header title={title} currentLocation={location} />
      {children}
      <Footer title={title} />
    </>
  );
};
