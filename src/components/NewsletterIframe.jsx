//src/components/NewsletterIframe.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Iframe = styled.iframe`
  margin: ${({ margin }) => margin || 0};
  background: #fafafa;
  border-radius: 4px;
`;

export const NewsletterIframe = props => (
  <Iframe
    title='Subscribe to my newsletter'
    width={props.width || '100%'}
    height={props.height || '285px'}
    src='https://marigno.substack.com/embed'
    frameBorder='0'
    scrolling='no'
    margin={props.margin}
  />
);

NewsletterIframe.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  margin: PropTypes.string,
};
