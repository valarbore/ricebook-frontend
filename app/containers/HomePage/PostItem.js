import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getDateFormatMimnute } from 'utils/date';
import PostCommentList from './PostCommentList';

export default function PostsItem({ post }) {
  PostsItem.propTypes = {
    post: PropTypes.object,
  };
  const [isShow, setIsShow] = useState(false);
  return (
    <div className="home-page-post-item-container">
      <div className="clearfix">
        <img
          className="home-page-post-item-author-avatar"
          src={post.avatar}
          alt={post.username}
        />
        <span className="home-page-post-item-author-name">{post.author}</span>
        <span className="home-page-post-item-publish-date">
          {getDateFormatMimnute(post.date)}
        </span>
      </div>

      <p className="home-page-post-item-post-title">{post.head}</p>
      <p className="home-page-post-item-post-body">{post.text}</p>
      {post.img && (
        <img
          className="home-page-post-item-post-image"
          src={post.img}
          alt={post.title}
        />
      )}
      <Button
        size="sm"
        style={{ marginBottom: '10px' }}
        onClick={() => setIsShow(!isShow)}
      >
        {isShow ? 'hide comments' : 'show comments'}
      </Button>
      <PostCommentList comments={post.comments} isShow={isShow} />
      <div className="home-page-post-item-operation-container">
        <Button className="home-page-post-item-operation-edit">Edit</Button>
        <Button className="home-page-post-item-operation-comment">
          Comment
        </Button>
      </div>
    </div>
  );
}
