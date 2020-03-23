import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../layout/Layout';

import { siteTitle } from '../../data/SiteConfig';
import { NewsletterIframe } from '../components/NewsletterIframe';

const AboutPage = () => (
  <Layout>
    <Helmet title={`Newsletter| ${siteTitle}`} />

    <h1>Newsletter</h1>
    <p>
      I write about positivity, poetry and life in general. I hate spam as much as you
      do and I only email when I publish a new article. You can
      unsubscribe at <i>any time</i>
    </p>

    <NewsletterIframe height={'480px'} />
  </Layout>
);

export default AboutPage;
