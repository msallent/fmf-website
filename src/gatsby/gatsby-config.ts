/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

/* eslint-disable global-require */

import { GatsbyConfig } from 'gatsby';
import { resolve } from 'path';

const isProduction = process.env.NODE_ENV === 'production';

const gatsbyConfig: GatsbyConfig = {
  siteMetadata: {
    title: 'FMF Creative Audio',
    description: 'Federico Mariano Franco - Creative Audio Producer',
    keywords: ['federico', 'mariano', 'franco', 'creative', 'audio', 'producer'],
    imageURI: '/social.jpg',
    siteUrl: 'https://gatsby-starter-skeleton.netlify.app',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        implementation: require('sass'),
        cssLoaderOptions: {
          localIdentName: isProduction ? '[hash:base64:5]' : '[name]_[local]-[hash:base64:5]',
        },
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-svgr',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: resolve(__dirname, '../assets'),
        name: 'assets',
      },
    },
    'gatsby-transformer-sharp',
  ],
};

export default gatsbyConfig;
