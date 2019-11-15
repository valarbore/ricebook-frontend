import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import FriendItem from './FriendItem';
export default function FriendList({ friends, unfollowFriend, addFriend }) {
  FriendList.propTypes = {
    friends: PropTypes.array,
    unfollowFriend: PropTypes.func,
    addFriend: PropTypes.func,
  };

  const [newFriend, setNewFriend] = useState('');

  const handleAddFriend = event => {
    addFriend(newFriend);
    setNewFriend('');
    event.preventDefault();
  };
  return (
    <div className="home-page-friend-container">
      <div>
        {friends.map(friend => (
          <FriendItem
            key={friend.id}
            friend={friend}
            unfollowFriend={unfollowFriend}
          />
        ))}
      </div>

      <Form
        inline
        className="home-page-add-friend-container"
        onSubmit={handleAddFriend}
      >
        <FormControl
          id="new-friend"
          size="sm"
          type="text"
          placeholder="new friends"
          value={newFriend}
          onChange={event => setNewFriend(event.target.value)}
          required
        />
        <Button
          className="home-page-add-friend-btn"
          size="sm"
          variant="primary"
          type="submit"
        >
          Add
        </Button>
      </Form>
    </div>
  );
}
