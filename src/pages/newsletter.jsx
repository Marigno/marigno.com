//src/pages/newsletter.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../layout/Layout';

import config from '../../data/SiteConfig';
import { NewsletterIframe } from '../components/NewsletterIframe';

const NewsletterPage = () => (
  <Layout>
    <Helmet title={`Newsletter| ${config.siteTitle}`} />

    <h1>Newsletter</h1>
    <p>
      I write about code, positivity, poetry and life in general. I hate spam as much as you
      do, and I only email when I publish a new article. You can
      unsubscribe at <i>any time</i>
    </p>

    <NewsletterIframe height={'480px'} />
  </Layout>
);

export default NewsletterPage;

