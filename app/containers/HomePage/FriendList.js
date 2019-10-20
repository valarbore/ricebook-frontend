import React, { useState, useEffect } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import FriendItem from './FriendItem';
export default function FriendList({
  friends,
  unfollowFriend,
  addFriend,
  addFriendError,
}) {
  const [newFriend, setNewFriend] = useState('');
  const [isShow, setShow] = useState('hidden');
  useEffect(() => {
    setShow('visible');
    const timer = setTimeout(() => {
      setShow('hidden');
    }, 1000);
    return () => clearTimeout(timer);
  }, [addFriendError]);
  const handleAddFriend = event => {
    addFriend(newFriend);
    setNewFriend('');
    event.preventDefault();
    event.stopPropagation();
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
      <div className="home-page-add-friend-container">
        <Form
          inline
          className="home-page-add-friend-form"
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
          <p
            style={{
              visibility: `${isShow}`,
              color: 'red',
              lineHeight: '20px',
              marginTop: '10px',
            }}
          >
            {addFriendError.addFriendErrorHint}
          </p>
        </Form>
      </div>
    </div>
  );
}
