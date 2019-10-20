import React, { useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';

export default function AddPost({ addPost }) {
  const initialPost = { title: '', body: '', image: null };
  const [post, setPost] = useState(initialPost);
  const updatePost = change => {
    setPost(Object.assign({ ...post }, change));
  };
  const addImage = event => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = e => {
      updatePost({ image: e.target.result });
    };
  };
  return (
    <div
      style={{
        border: '1px solid rgba(175, 175, 175, 0.5)',
        borderRadius: '5px',
        padding: '20px',
      }}
    >
      <h5>Make A New Post</h5>
      <Form>
        <FormControl
          placeholder="Enter a title"
          value={post.title}
          onChange={event => updatePost({ title: event.target.value })}
        />
        <FormControl
          value={post.body}
          onChange={event => updatePost({ body: event.target.value })}
          placeholder="Enter post content"
          as="textarea"
          rows="3"
          style={{
            margin: '15px 0',
          }}
        />
        <input
          id="home-page-upload-post-image"
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
          onClick={() =>
            document.getElementById('home-page-upload-post-image').click()
          }
        >
          Add Image
        </Button>
      </Form>
      <div style={{ display: 'flex', marginTop: '15px' }}>
        <Button
          size="sm"
          style={{ flex: '1', marginRight: '40px' }}
          onClick={() => setPost(initialPost)}
        >
          Cancel
        </Button>
        <Button
          size="sm"
          style={{ flex: '1' }}
          onClick={() => {
            addPost(post);
            setPost(initialPost);
          }}
        >
          Post
        </Button>
      </div>
    </div>
  );
}
