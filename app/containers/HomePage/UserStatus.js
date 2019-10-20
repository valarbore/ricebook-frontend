import React, { useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
export default function UserStatus({ user, logout, goProfile, updateUser }) {
  const [newStatus, setNewStatus] = useState('');
  return (
    <div className="home-page-left-up-container">
      <div style={{ display: 'flex' }}>
        <Button
          variant="link"
          style={{ flex: '1' }}
          onClick={() => logout(user)}
        >
          Log Out
        </Button>
        <Button
          variant="link"
          style={{ flex: '1' }}
          onClick={() => goProfile(user.id)}
        >
          Profile
        </Button>
      </div>
      <img className="home-page-avatar" src={user.avatar} alt={user.username} />
      <p className="home-page-username">{user.username}</p>
      <p className="home-page-status">{user.status}</p>
      <Form
        inline
        style={{ marginTop: '20px' }}
        onSubmit={event => {
          updateUser({ status: newStatus });
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <FormControl
          size="sm"
          type="text"
          placeholder="new status"
          style={{ width: '150px', margin: '0 15px 0 30px' }}
          onChange={event => setNewStatus(event.target.value)}
          required
        />
        <Button size="sm" variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
}
