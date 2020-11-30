import React, { FunctionComponent } from 'react';
import { Link, PageProps } from 'gatsby';
import classNames from 'classnames';
import { PageTitle } from '../components/PageTitle';
import styles from '../style/pages/404.module.scss';

const NotFound: FunctionComponent<PageProps> = () => (
  <main>
    <PageTitle title="404 - Not Found" />
    <div className={classNames('container', styles.notFound)}>
      <h1>Error 404</h1>
      <h2>Not Found</h2>
      <Link to="/albums/world-music-album">Go back</Link>
    </div>
  </main>
);

export default NotFound;
