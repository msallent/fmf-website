import React, { FunctionComponent } from 'react';
import { PageProps } from 'gatsby';
import { PageTitle } from '../components/PageTitle';

const About: FunctionComponent<PageProps> = () => (
  <main>
    <PageTitle title="About" />
  </main>
);

export default About;
