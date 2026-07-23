//src/pages/links.jsx
import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../layout/Layout";
import styled from "@emotion/styled";

import config from "../../data/SiteConfig";
import {
  GithubIcon,
  LinkedinIcon,
  VissuIcon,
} from "../components/Footer/components/Icons";

const LinksHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  img {
    height: 150px;
    width: auto;
    border-radius: 50%;
    margin-left: 0px;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
`;

const LinkWrapper = styled.div`
  width: 100%;
  max-width: 470px;
  background-color: ${(props) => props.theme.highContrastBg};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.backgroundColor};
  }
`;

const LinkContent = styled.a`
  display: flex;
  gap: 1rem;
  align-items: center;
  text-decoration: none;
  color: inherit;
  width: 100%;
  padding: 1rem;
  border: none;
  border-bottom: none;
  box-shadow: none;

  svg {
    width: 42px;
    height: 42px;
    flex-shrink: 0;
  }

  p {
    margin: 0;
  }

  &:hover {
    text-decoration: none;
  }
`;

const LinksPage = () => {
  return (
    <Layout>
      <Helmet title={`Links | ${config.siteTitle}`} />

      <LinksHeader>
        <img src="/myself.jpg" alt="Diego Marigno" />
        <h1>Diego Marigno</h1>
        <h2>Product Engineer</h2>
        <p>Full-Stack Development &amp; Applied AI</p>
      </LinksHeader>

      <LinksContainer>
        <LinkWrapper>
          <LinkContent
            href="https://vissu.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <VissuIcon />
            <p>Vissu – My Financial App</p>
          </LinkContent>
        </LinkWrapper>
        <LinkWrapper>
          <LinkContent
            href="https://github.com/marigno"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
            <p>GitHub</p>
          </LinkContent>
        </LinkWrapper>
        <LinkWrapper>
          <LinkContent
            href="https://www.linkedin.com/in/diego-marigno"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinIcon />
            <p>LinkedIn</p>
          </LinkContent>
        </LinkWrapper>
      </LinksContainer>
    </Layout>
  );
};

export default LinksPage;
