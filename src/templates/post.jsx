//src/templates/post.jsx
import React from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from '@emotion/styled';
import Layout from '../layout/Layout';
import SocialLinks from '../components/SocialLinks/SocialLinks';
import Seo from '../components/SEO/Seo';
import config from '../../data/SiteConfig';
import { PostRead } from '../components/PostRead';
import { PostDate} from '../components/PostDate';
import { NewsletterIframe } from '../components/NewsletterIframe';
import { Article } from './styles';
import { SpacingContainer } from '../components/styles';

const PostTemplate = props => {
  const { data, pageContext } = props;
  const { slug } = pageContext;
  const postNode = data.markdownRemark;
  const post = postNode.frontmatter;
  const { fancyDate } = postNode.fields;
  //const githubLink = `${config.repo}/blob/master/content/posts/${fileName}.md`;

  const PostEnd = styled.div`
    display: flex;
  `;

  const TextEnd = styled.div`
    text-align: right;
  `;

  const EndTitle = styled.span`
    font-size: 12px;
  `;

  const FirstEnd = styled.div`
    flex-grow: 1;
  `;

  const PostContent = styled.div`
    text-align: justify;
  `;

  return (
    <Layout>
      <Helmet
        title={`${post.title} | ${config.siteTitle}`}
        description={postNode.excerpt}
      />
      <Seo postPath={slug} postNode={postNode} postSEO />
      <Article>
        {post.cover && <GatsbyImage image={post.cover.childImageSharp.gatsbyImageData} alt={post.title} />}

        <SpacingContainer as='h1' marginBottom={0}>
          {post.title}
        </SpacingContainer>

        <SpacingContainer marginBottom='40px'>
          <PostRead timeToRead={postNode.timeToRead} />
          <small>
            {' • '}
            <i><span>photo by {post.picture}</span></i>
            {' • '}
            {post.categories.map((category, index) => (
              <React.Fragment key={category}>
                <Link to={`/${category}/`}>{category}</Link>
                {index < post.categories.length - 1 && ', '}
              </React.Fragment>
            ))}
          </small>
        </SpacingContainer>
        <PostContent dangerouslySetInnerHTML={{ __html: postNode.html }} />
        <PostEnd>
          <FirstEnd><EndTitle>{'SHARE THIS NOW'}</EndTitle>
          <SocialLinks postPath={slug} postNode={postNode} /></FirstEnd>
          <TextEnd><EndTitle>{'WRITTEN ON:'}</EndTitle>
          <PostDate date={fancyDate} /></TextEnd>
        </PostEnd>
        <NewsletterIframe margin={'0 0 1.4rem'} />
      </Article>
    </Layout>
  );
};

export default PostTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        author
        categories
        picture
        cover {
          childImageSharp {
            gatsbyImageData(width: 650, quality: 85)
          }
        }
      }
      fields {
        slug
        fancyDate
        fileName
      }
    }
  }
`;