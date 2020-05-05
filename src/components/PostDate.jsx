import React from 'react';
import PropTypes from 'prop-types';

export const PostDate = ({ date }) => (
  <small>
    <br></br>
    <span>{date}</span>
  </small>
);

PostDate.propTypes = {
    date: PropTypes.string.isRequired,
};