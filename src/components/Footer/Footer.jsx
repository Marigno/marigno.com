//src/components/Footer/Footer.jsx
import React from 'react';
import styled from '@emotion/styled';

import config from '../../../data/SiteConfig';
import { Container } from '../../layout/components/container';
import {
  TwitterIcon,
  RssIcon,
  GoodreadsIcon,
  InstagramIcon,
} from './components/Icons';

const Footer = () => (
  <footer>
    <FooterContainer>
      <Container>
        <FooterLink
          href='https://twitter.com/marigno_'
          target='_blank'
          rel='noreferrer nofollow'
          title='Follow me on Twitter'
        >
          <TwitterIcon />
        </FooterLink>
        <FooterLink
          href={config.siteRss}
          target='_blank'
          rel='noreferrer nofollow'
          title='Follow the RSS feed'
        >
          <RssIcon />
        </FooterLink>
        <FooterLink 
        href='https://www.goodreads.com/review/list/35837419-diego-marigno?shelf=read'
        target='_blank'
        title='See all my read books'
        >
          <GoodreadsIcon />
          
        </FooterLink>
        <FooterLink 
        href='https://www.instagram.com/diegomarigno/'
        target='_blank'
        title='See all my photos on Instagram'
        >
          <InstagramIcon />
          
        </FooterLink>
      </Container>
    </FooterContainer>
  </footer>
);

export default Footer;

export const FooterContainer = styled.div`
  background: ${({ theme }) => theme.navigationBg};
  border-top: 1px solid ${({ theme }) => theme.lightBackground};

  svg {
    margin-right: 0px;
    stroke: ${({ theme }) => theme.textColor};
  }
`;
export const FooterLink = styled.a`
  display: inline;
  text-decoration: none;
  justify-content: center;
  position: relative;
  left: 40%; 
  box-shadow: none;
  margin-right: 5px;
  color: ${({ theme }) => theme.textColor};
  padding: 1px 2px;
  &:hover {
    opacity: 0.7;
  }
`;
