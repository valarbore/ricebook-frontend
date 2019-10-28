/**
 *
 * ProfilePage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Button } from 'react-bootstrap';
import { makeSelectAvatar } from './selectors';
import { makeSelectUser } from '../App/selectors';
import { updateUserAction } from '../App/actions';

import reducer from './reducer';
import saga from './saga';

import './styles.css';

import CurrentInfo from './CurrentInfo';
import UpdateForm from './UpdateForm';

export function ProfilePage({ user, updateAvatar, updateUser }) {
  ProfilePage.propTypes = {
    user: PropTypes.object,
    updateAvatar: PropTypes.func,
    updateUser: PropTypes.func,
  };
  useInjectReducer({ key: 'profilePage', reducer });
  useInjectSaga({ key: 'profilePage', saga });
  return (
    <div className="main-container clearfix">
      <Helmet>
        <title>ProfilePage</title>
        <meta name="description" content="Description of ProfilePage" />
      </Helmet>
      <div className="profile-page-left-container">
        <div className="profile-page-avatar-container">
          <img
            src={user.avatar}
            alt="avatar"
            className="profile-page-avatar "
          />
          <input
            type="file"
            id="image_uploads"
            onChange={updateAvatar}
            style={{ visibility: 'hidden', position: 'fixed' }}
          />
          <Button
            onClick={() => document.getElementById('image_uploads').click()}
          >
            update new pictrue
          </Button>
        </div>
        <CurrentInfo user={user} />
      </div>
      <div className="profile-page-right-container ">
        <div>
          <h2 style={{ margin: '50px 0 30px 200px' }}>FolksZone</h2>
          <h4 style={{ marginLeft: '300px' }}>A place for folks</h4>
        </div>
        <UpdateForm user={user} updateUser={updateUser} />
      </div>
    </div>
  );
}

ProfilePage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  avatar: makeSelectAvatar(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateAvatar: event => {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = e => {
        dispatch(updateUserAction({ avatar: e.target.result }));
      };
    },
    updateUser: user => dispatch(updateUserAction(user)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProfilePage);
