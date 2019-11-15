import React from 'react';
import PropTypes from 'prop-types';
import PostsItem from './PostItem';
export default function PostsList({ posts }) {
  PostsList.propTypes = {
    posts: PropTypes.array,
  };
  return (
    <div>
      {posts.length > 0 ? (
        posts.map(post => (
          // eslint-disable-next-line no-underscore-dangle
          <PostsItem post={post} key={post._id} />
        ))
      ) : (
        <p style={{ height: '50px', lineHeight: '50px' }}>There is no posts!</p>
      )}
    </div>
  );
}
