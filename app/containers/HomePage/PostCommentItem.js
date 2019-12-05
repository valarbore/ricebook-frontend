/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { createStructuredSelector } from 'reselect';
import { makeSelectUser } from '../App/selectors';
import { updateCommentAction } from './actions';

function PostsCommentItem({ comment, user, updateComment, postId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempComment, setTempComment] = useState('');
  PostsCommentItem.propTypes = {
    comment: PropTypes.object,
    user: PropTypes.object,
    updateComment: PropTypes.func,
    postId: PropTypes.string,
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
      {isEditing ? (
        <Form
          onSubmit={event => {
            const formData = new FormData();
            formData.append('commentId', comment._id);
            formData.append('text', tempComment);
            updateComment(postId, formData);
            setIsEditing(false);
            event.preventDefault();
          }}
        >
          <Form.Control
            required
            value={tempComment}
            onChange={event => setTempComment(event.target.value)}
          />
          <div style={{ display: 'flex', marginTop: '8px' }}>
            <Button
              style={{ flex: '1', marginRight: '15px' }}
              size="sm"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button type="submit" style={{ flex: '1' }} size="sm">
              Update
            </Button>
          </div>
        </Form>
      ) : (
        <div style={{ position: 'relative' }}>
          <h6>{comment.author}:</h6>
          {user.username === comment.author && (
            <Button
              variant="secondary"
              style={{
                position: 'absolute',
                right: '0',
                top: '0',
                fontSize: '10px',
              }}
              onClick={() => {
                setTempComment(comment.text);
                setIsEditing(true);
              }}
            >
              Edit
            </Button>
          )}
          {comment.text}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateComment: (postId, data) =>
      dispatch(updateCommentAction(postId, data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostsCommentItem);
