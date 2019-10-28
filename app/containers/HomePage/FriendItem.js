import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
export default function FriendItem({ friend, unfollowFriend }) {
  FriendItem.propTypes = {
    friend: PropTypes.object,
    unfollowFriend: PropTypes.func,
  };
  return (
    <div className="home-page-list-item-container">
      <img
        src={friend.avatar}
        alt={friend.name}
        className="home-page-list-item-img"
      />
      <div style={{ width: '100%', marginTop: '10px' }} className="clearfix">
        <div
          style={{
            width: '70%',
            display: 'inline-block',
            textAlign: 'left',
            float: 'left',
          }}
        >
          <p style={{ margin: '0', fontWeight: 'bold', fontSize: '16px' }}>
            {friend.username}
          </p>
          <p style={{ fontSize: '14px' }}>{friend.status}</p>
        </div>
        <Button
          style={{ float: 'right' }}
          size="sm"
          className="home-page-list-item-btn"
          variant="outline-danger"
          onClick={() => unfollowFriend(friend)}
        >
          Unfollow
        </Button>
      </div>
    </div>
  );
}
