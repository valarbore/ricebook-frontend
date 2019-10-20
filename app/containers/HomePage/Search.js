import React, { useState } from 'react';
import { Form, FormControl, Button, Row, Col } from 'react-bootstrap';
export default function Search({ searchPost }) {
  const [searchContent, setSearchContent] = useState('');
  return (
    <Form
      inline
      style={{ margin: '15px 0', width: '100%', display: 'flex' }}
      onSubmit={event => {
        searchPost(searchContent);
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <FormControl
        size="sm"
        type="text"
        placeholder="search posts"
        value={searchContent}
        onChange={event => setSearchContent(event.target.value)}
        style={{ flex: '1', marginRight: '20px' }}
      />
      <Button
        size="sm"
        variant="primary"
        type="submit"
        style={{ width: '100px' }}
      >
        Search
      </Button>
    </Form>
  );
}
