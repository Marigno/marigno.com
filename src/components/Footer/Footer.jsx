import React from 'react';
import styled from '@emotion/styled';

import config from '../../../data/SiteConfig';
import { Container } from '../../layout/components/container';
import {
  GithubIcon,
  TwitterIcon,
  GoodreadsIcon,
} from './components/Icons';

const Footer = () => (
  <footer>
    <FooterContainer>
      <Container>
        <FooterLink
          href='https://twitter.com/diegomarigno'
          target='_blank'
          rel='noreferrer nofollow'
          title='Follow me on Twitter'
        >
          <TwitterIcon />
        </FooterLink>
        <FooterLink
          href={config.repo}
          target='_blank'
          rel='noreferrer nofollow'
          title='View source on Github'
        >
          <GithubIcon />
        </FooterLink>
        <FooterLink 
        href='https://www.goodreads.com/review/list/35837419-diego-marigno?shelf=read'
        title='See all my read books'
        >
          <GoodreadsIcon />
          
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
  left: 45%; 
  box-shadow: none;
  margin-right: 5px;
  color: ${({ theme }) => theme.textColor};
  padding: 1px 2px;
  &:hover {
    opacity: 0.7;
  }
`;
