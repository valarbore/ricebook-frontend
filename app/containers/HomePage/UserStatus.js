import React, { useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';
export default function UserStatus({
  user,
  logout,
  goProfile,
  updateHeadline,
}) {
  UserStatus.propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func,
    goProfile: PropTypes.func,
    updateHeadline: PropTypes.func,
  };
  const [newStatus, setNewStatus] = useState('');
  return (
    <div className="home-page-left-up-container">
      <div style={{ display: 'flex' }}>
        <Button
          id="logout-btn"
          variant="link"
          style={{ flex: '1' }}
          onClick={() => logout(user)}
        >
          Log Out
        </Button>
        <Button
          variant="link"
          style={{ flex: '1' }}
          onClick={() => goProfile(user.username)}
        >
          Profile
        </Button>
      </div>
      <img className="home-page-avatar" src={user.avatar} alt={user.username} />
      <p className="home-page-username">{user.username}</p>
      <p className="home-page-status">{user.headline}</p>
      <Form
        inline
        style={{ marginTop: '20px' }}
        onSubmit={event => {
          updateHeadline(newStatus);
          setNewStatus('');
          event.preventDefault();
        }}
      >
        <FormControl
          name="headline"
          size="sm"
          type="text"
          placeholder="new status"
          style={{ width: '150px', margin: '0 15px 0 30px' }}
          onChange={event => setNewStatus(event.target.value)}
          value={newStatus}
          required
        />
        <Button size="sm" variant="primary" type="submit" id="update-headline">
          Update
        </Button>
      </Form>
    </div>
  );
}
