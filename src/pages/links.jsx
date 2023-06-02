//src/pages/links.jsx
import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../layout/Layout";
import styled from "@emotion/styled";

import config from "../../data/SiteConfig";

const LinksHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  img {
    height: 150px;
    width: auto;
    border-radius: 4px;
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

  img {
    width: 70px;
    height: 70px;
    object-fit: contain;
  }

  p {
    margin-top: 30px;
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
        <img src="/myself.png" alt="Diego Marigno" />
        <h1>Diego Marigno</h1>
        <h2>Artist and polyglot</h2>
        <p>I capture images of what I like.</p>
      </LinksHeader>

      <LinksContainer>
        <LinkWrapper>
          <LinkContent
            href="https://opensea.io/collection/zephyrum/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/links/zephyrum.jpg" alt="Zephyrum" />
            <p>Zephyrum – 1/1s</p>
          </LinkContent>
        </LinkWrapper>
        <LinkWrapper>
          <LinkContent
            href="https://foundation.app/@marigno"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/links/foundation.jpeg" alt="Foundation" />
            <p>Foundation</p>
          </LinkContent>
        </LinkWrapper>
      </LinksContainer>
      <br/>
    </Layout>
  );
};

export default LinksPage;