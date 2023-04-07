//src/components/PostListing/PostListing.jsx
import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PostInfo from '../PostInfo';

const PostListing = ({ postList, isBig }) => {
  return (
    <PostListContainer>
      {postList &&
        postList.map(post => {
          const ariaLabel = `Visit ${post.title}`;
          const coverImage = getImage(post.cover);
          return (
            <PostItem key={post.path} isBig={isBig}>
              {post.cover && (
                <StyledLink to={post.path} isBig={isBig} aria-label={ariaLabel}>
                  {coverImage && <GatsbyImage image={coverImage} alt={post.title} />}
                </StyledLink>
              )}
              <PostItemContent isBig={isBig}>
                <StyledLink to={post.path} isBig={isBig} aria-label={ariaLabel}>
                  <ListItemHeader as={isBig ? 'h2' : 'h3'} isBig={isBig}>
                    {post.title}
                  </ListItemHeader>
                </StyledLink>
                {post.excerpt && <Excerpt>{post.excerpt}</Excerpt>}
                <PostInfo date={post.date} timeToRead={post.timeToRead} />
              </PostItemContent>
            </PostItem>
          );
        })}
    </PostListContainer>
  );
};

const PostItemContent = styled.div`
  padding-top: ${props => (props.isBig ? '0.625rem' : '0')};
`;

const Excerpt = styled.p`
  margin-bottom: 0;
`;

const StyledLink = styled(({ isBig, ...rest }) => <Link {...rest} />)`
  color: inherit;
  box-shadow: none;
  display: block;
  font-size: 0;
  margin-right: ${props => !props.isBig && '1.125rem'};
`;

const PostItem = styled.div`
  margin-bottom: ${props => (props.isBig ? '30px' : '1.125rem')};
  display: flex;
  flex-direction: ${props => (props.isBig ? 'column' : 'row')};
`;

const PostListContainer = styled.section``;

const ListItemHeader = styled.h2`
  font-weight: bold;
  margin-top: 0;
  margin-bottom: ${props => (!props.isBig ? '0' : '0.5rem')};
  font-size: ${props => !props.isBig && '1.25rem'};

  &:hover {
    opacity: 0.7;
  }
`;

export default PostListing;