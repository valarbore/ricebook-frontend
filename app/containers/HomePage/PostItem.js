import React from 'react';
import { Button } from 'react-bootstrap';
export default function PostsItem({ post }) {
  return (
    <div className="home-page-post-item-container">
      <div className="clearfix">
        <img
          className="home-page-post-item-author-avatar"
          src={post.author.avatar}
          alt={post.author.username}
        />
        <span className="home-page-post-item-author-name">
          {post.author.username}
        </span>
        <span className="home-page-post-item-publish-date">
          {post.publishDate}
        </span>
      </div>

      <p className="home-page-post-item-post-title">{post.title}</p>
      <p className="home-page-post-item-post-body">{post.body}</p>
      {post.image && (
        <img
          className="home-page-post-item-post-image"
          src={post.image}
          alt={post.title}
        />
      )}

      <div className="home-page-post-item-operation-container">
        <Button className="home-page-post-item-operation-edit">Edit</Button>
        <Button className="home-page-post-item-operation-comment">
          Comment
        </Button>
      </div>
    </div>
  );
}
