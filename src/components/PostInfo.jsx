//src/components/PostInfo.jsx
import React from 'react';
import PropTypes from 'prop-types';

 const PostInfo = ({ date, timeToRead }) => {
  return (
    <small>
      <span>{date}</span>
      <span>{` • ${timeToRead} min read`}</span>
    </small>
  );
 };

PostInfo.propTypes = {
  date: PropTypes.string.isRequired,
  timeToRead: PropTypes.number.isRequired,
};

export default PostInfo;