import React from 'react';
import PropTypes from 'prop-types';
export default function CurrentInfo({ user }) {
  CurrentInfo.propTypes = {
    user: PropTypes.object,
  };
  return (
    <div style={{ padding: '0 15px' }}>
      <h3>Current Info</h3>
      <ul>
        <li className="profile-page-current-info">{user.username}</li>
        <li className="profile-page-current-info">{user.email}</li>
        <li className="profile-page-current-info">{user.phone}</li>
        <li className="profile-page-current-info">{user.address.zipcode}</li>
        <li className="profile-page-current-info">
          {'*'.repeat(user.address.street.length)}
        </li>
      </ul>
    </div>
  );
}
