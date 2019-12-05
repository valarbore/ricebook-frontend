/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatePostAction } from './actions';

function EditPost({ submitPost, cancelEdit, currentPost }) {
  const initialPost = {
    title: currentPost.head,
    body: currentPost.text,
    image: currentPost.img,
    file: '',
  };
  const [post, setPost] = useState(initialPost);

  const updatePost = change => {
    setPost(Object.assign({ ...post }, change));
  };
  const addImage = event => {
    const temp = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = e => {
      updatePost({ image: e.target.result, file: temp });
    };
  };
  EditPost.propTypes = {
    submitPost: PropTypes.func,
    cancelEdit: PropTypes.func,
    currentPost: PropTypes.object,
  };
  return (
    <div>
      <Form>
        <FormControl
          placeholder="Enter a title"
          id="new-article-title"
          value={post.title}
          onChange={event =>
            updatePost({ title: event.target.value, file: event.target.value })
          }
        />
        <FormControl
          value={post.body}
          onChange={event => updatePost({ body: event.target.value })}
          placeholder="Enter post content"
          id="new-article-body"
          as="textarea"
          rows="3"
          style={{
            margin: '15px 0',
          }}
        />
        <input
          id={currentPost._id}
          style={{ position: 'absolute', visibility: 'hidden' }}
          type="file"
          onChange={addImage}
        />
        {post.image && (
          <img
            src={post.image}
            alt="test"
            style={{ width: '100%', marginBottom: '15px' }}
          />
        )}
        <Button
          size="sm"
          style={{ width: '100%' }}
          onClick={() => document.getElementById(currentPost._id).click()}
        >
          {post.image === null ? 'Add Image' : 'Chang Image'}
        </Button>
      </Form>
      <div style={{ display: 'flex', marginTop: '15px' }}>
        <Button
          size="sm"
          style={{ flex: '1', marginRight: '40px' }}
          onClick={() => cancelEdit()}
        >
          Cancel
        </Button>
        <Button
          id="add-new-article"
          size="sm"
          style={{ flex: '1' }}
          onClick={() => {
            const formData = new FormData();
            formData.append('head', post.title);
            formData.append('text', post.body);
            formData.append('img', post.file);
            console.log(post.file);
            // eslint-disable-next-line no-underscore-dangle
            submitPost(currentPost._id, formData);
            cancelEdit();
          }}
        >
          Post
        </Button>
      </div>
    </div>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    submitPost: (postId, data) => dispatch(updatePostAction(postId, data)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(EditPost);
