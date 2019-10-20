import React from 'react';
import PostsItem from './PostItem';
export default function PostsList({ posts }) {
  return (
    <div>
      {posts.length > 0 ? (
        posts.map(post => <PostsItem post={post} key={post.id} />)
      ) : (
        <p style={{ height: '50px', lineHeight: '50px' }}>There is no posts!</p>
      )}
    </div>
  );
}
