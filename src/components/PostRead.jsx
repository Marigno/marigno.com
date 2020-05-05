import React from 'react';
import PropTypes from 'prop-types';

export const PostRead = ({ timeToRead }) => (
  <small>
    <span>{`${timeToRead} min read`}</span>
  </small>
);

PostRead.propTypes = {
  timeToRead: PropTypes.number.isRequired,
};