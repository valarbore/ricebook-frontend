import React from 'react';
import PropTypes from 'prop-types';
import PostsCommentItem from './PostCommentItem';
export default function PostsList({ comments, isShow }) {
  PostsList.propTypes = {
    comments: PropTypes.array,
    isShow: PropTypes.bool,
  };
  return (
    <div style={{ display: isShow ? 'block' : 'none' }}>
      {comments.length > 0 ? (
        comments.map(comment => (
          // eslint-disable-next-line no-underscore-dangle
          <PostsCommentItem comment={comment} key={comment._id} />
        ))
      ) : (
        <p style={{ height: '50px', lineHeight: '50px' }}>
          There is no comments!
        </p>
      )}
    </div>
  );
}
