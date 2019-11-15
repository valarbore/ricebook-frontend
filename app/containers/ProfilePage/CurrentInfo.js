import React from 'react';
import PropTypes from 'prop-types';
import { getDateFormatDay } from 'utils/date';
export default function CurrentInfo({ user }) {
  CurrentInfo.propTypes = {
    user: PropTypes.object,
  };
  return (
    <div style={{ padding: '0 15px' }}>
      <h3>Current Info</h3>
      <ul>
        <li className="profile-page-current-info">Username: {user.username}</li>
        <li className="profile-page-current-info">Email: {user.email}</li>
        <li className="profile-page-current-info">
          Date of Birth: {getDateFormatDay(user.dob)}
        </li>
        <li className="profile-page-current-info">Zip Code: {user.zipcode}</li>
      </ul>
    </div>
  );
}
