/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

import { GatsbyNode } from 'gatsby';

export const createPages: GatsbyNode['createPages'] = ({ actions: { createRedirect } }) => {
  createRedirect({
    fromPath: '/',
    toPath: '/albums/world-music-album',
    isPermanent: true,
  });
};
