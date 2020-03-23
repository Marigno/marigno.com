import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../layout/Layout';
import styled from '@emotion/styled';

import { siteTitle } from '../../data/SiteConfig';
import { NewsletterIframe } from '../components/NewsletterIframe';

const AboutMe = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 150px;
    width: auto;
    border-radius: 4px;
    margin-left: 20px;
  }
`;
const AboutPage = () => {
  const today = new Date();
  const birthDate = new Date('2015-09-18');
  const m = today.getMonth() - birthDate.getMonth();

  let age = today.getFullYear() - birthDate.getFullYear();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return (
    <Layout>
      <Helmet title={`About me | ${siteTitle}`} />

      <AboutMe>
        <div>
          <h1>About me</h1>
          <p>
            I'm Diego Marigno, I'm a writer and photographer living in the
            beautiful city of Bogotá and working remote for a freelancing chat firm.
          </p>
        </div>
        <img src='/myself.png' alt='Diego Marigno' />
      </AboutMe>

      <h2>Photography</h2>
      <p>
       Photography is one of my passions. I have always tried to
       express myself, and show others how I see the world, through a lense. 
       I believe that everything worthwhile telling can be encaptured in a photo.
       They are our memories from eternity. You can see my portafolio{' '}
        <a href=''>here</a>.
      </p>

      <h2>This place</h2>
      <p>
        This is my personal website on the internet. You'll find articles about my
        ideas, thoughts and everything else that I consider worthwhile.
      </p>

      <p>
        There are moments that have defined me deeply and I always carry those moments with me; 
        I'm passionate, I like to go beyond, and if you find me, 
        you would most probably encounter me day-dreaming! 
      </p>

      <h2>Freelancing</h2>
      <p>
        I'm a part-time freelancer working on a wide variety of projects,
        helping people become better writers and marketers. If you'd like to work with me, just{' '}
        <a href='mailto:diego@marigno.com'>get in touch</a>.
      </p>

      <h2>Contacting me</h2>
      <p>
        You can reach out to me on{' '}
        <a href='https://twitter.com/diegomarigno'>Twitter</a>.
      </p>

      <h2>Newsletter</h2>
      <p>
        Follow all my new articles and updates via my newsletter. You'll receive
        emails <i>only</i> for my new articles. Unsubscribe anytime.
      </p>
      <NewsletterIframe />
    </Layout>
  );
  };

export default AboutPage;
