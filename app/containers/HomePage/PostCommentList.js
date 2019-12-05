/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import PostsCommentItem from './PostCommentItem';
export default function PostsList({ comments, isShow, postId }) {
  PostsList.propTypes = {
    comments: PropTypes.array,
    isShow: PropTypes.bool,
    postId: PropTypes.string,
  };
  return (
    <div style={{ display: isShow ? 'block' : 'none' }}>
      {comments.length > 0 ? (
        comments.map(comment => (
          <PostsCommentItem
            comment={comment}
            key={comment._id}
            postId={postId}
          />
        ))
      ) : (
        <p style={{ height: '50px', lineHeight: '50px' }}>
          There is no comments!
        </p>
      )}
    </div>
  );
}
