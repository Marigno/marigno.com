import React from 'react';
import PropTypes from 'prop-types';

export const PostDate = ({ date }) => (
  <span>
    <br></br>
    <span>{date}</span>
  </span>
);

PostDate.propTypes = {
    date: PropTypes.string.isRequired,
};