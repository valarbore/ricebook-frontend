import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
export default function Search({ searchPost }) {
  Search.propTypes = {
    searchPost: PropTypes.func,
  };
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
        name="search"
        size="sm"
        type="text"
        placeholder="search posts"
        value={searchContent}
        onChange={event => setSearchContent(event.target.value)}
        style={{ flex: '1', marginRight: '20px' }}
      />
      <Button
        id="search-btn"
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
