/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getDateFormatMimnute } from 'utils/date';
import { updateCommentAction } from './actions';
import PostCommentList from './PostCommentList';
import EditPost from './EditPost';

function PostsItem({ post, currentUser, updateComment }) {
  PostsItem.propTypes = {
    post: PropTypes.object,
    currentUser: PropTypes.string,
    updateComment: PropTypes.func,
  };
  const [isShow, setIsShow] = useState(false);
  const [comment, setComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="home-page-post-item-container">
      {isEditing ? (
        <EditPost cancelEdit={() => setIsEditing(false)} currentPost={post} />
      ) : (
        <div>
          <div className="clearfix">
            <img
              className="home-page-post-item-author-avatar"
              src={post.avatar}
              alt={post.author}
            />
            <span className="home-page-post-item-author-name">
              {post.author}
            </span>
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
          <div style={{ marginBottom: '10px', position: 'relative' }}>
            <Button size="sm" onClick={() => setIsShow(!isShow)}>
              {isShow ? 'hide comments' : 'show comments'}
            </Button>
            {post.author === currentUser && (
              <Button
                size="sm"
                style={{ position: 'absolute', right: '0' }}
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
            )}
          </div>

          <PostCommentList
            comments={post.comments}
            isShow={isShow}
            postId={post._id}
          />
          <Form
            className="home-page-post-item-operation-container"
            onSubmit={event => {
              const formData = new FormData();
              formData.append('commentId', -1);
              formData.append('text', comment);
              // eslint-disable-next-line no-underscore-dangle
              updateComment(post._id, formData);
              setComment('');
              event.preventDefault();
            }}
          >
            <Form.Control
              type="text"
              placeholder="Enter your comment"
              required
              onChange={event => setComment(event.target.value)}
              value={comment}
            />
            <Button
              size="sm"
              type="submit"
              style={{ width: '120px', marginLeft: '10px' }}
            >
              Comment
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    updateComment: (postId, data) =>
      dispatch(updateCommentAction(postId, data)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(PostsItem);
