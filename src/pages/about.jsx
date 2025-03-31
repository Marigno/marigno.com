//src/pages/about.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../layout/Layout';
import styled from '@emotion/styled';

import { siteTitle } from '../../data/SiteConfig';

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
  const birthDate = new Date('2010-03-29');
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
          <h1>Hey, I'm Diego</h1>
          <p>
            I'm a thinker and polyglot. What I enjoy most is writing, coding and photography.
          </p>
        </div>
        <img src='/myself.png' alt='Diego Marigno' />
      </AboutMe>

      <h2>Photography</h2>
      <p>
       Pictures are our memories from eternity, and
       I believe that everything that's worth telling can be encaptured in a photo. 
      </p>
      <p>
        All images that you may find on this website were taken by me.
        I currently use a Nikon D7000 (with a Nikkor 50mm f/1.8G), a GoPro MAX, and a Canon A1. 
      </p>

      <h2>This place</h2>
      <p>
        Here you'll find articles about my ideas, thoughts and everything else that I consider worthwhile. 
        It's been {age} years since I've been writing and coding.
      </p>

      <p>
        I'm passionate about life in general. I like to go beyond, and if you find me, 
        you would most probably encounter me day-dreaming, or thinking how to solve a code problem!
      </p>

      <h2>Solo building</h2>
      <p>
        I'm a solo builder, too. In 2023, I started a financial app by myself to remplace all my spreadsheets. <a href="https://vissu.app">Vissu</a> was born.
      </p>

      <h2>Contacting me</h2>
      <p>
        You can reach out to me on{' '}
        <a href='https://x.com/diegomarigno'>X</a>.
      </p>
    </Layout>
  );
  };

export default AboutPage;