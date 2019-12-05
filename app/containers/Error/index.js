/**
 *
 * Error
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectUser } from '../App/selectors';
export function Error({ user }) {
  return (
    <div className="main-container">
      <Helmet>
        <title>Error</title>
        <meta name="description" content="Description of Error" />
      </Helmet>
      <div
        style={{
          margin: '100px auto 0 auto',
          textAlign: 'center',
        }}
      >
        <h4 style={{ color: 'red', marginBottom: '80px' }}>
          Link Failed! This google account is already linked with another
          account!
        </h4>
        <Link to={`/profile/${user.username}`}>Go Back to Profile</Link>
      </div>
    </div>
  );
}

Error.propTypes = {
  user: PropTypes.object,
};
const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Error);
