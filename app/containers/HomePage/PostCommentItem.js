import React from 'react';
import PropTypes from 'prop-types';

export default function PostsList({ comment }) {
  PostsList.propTypes = {
    comment: PropTypes.object,
  };
  return (
    <div
      style={{
        borderRadius: '10px',
        backgroundColor: ' rgba(175, 175, 175, 0.3)',
        padding: '5px 10px',
        margin: '5px 0',
        fontSize: '12px',
      }}
    >
      {comment.body}
    </div>
  );
}
