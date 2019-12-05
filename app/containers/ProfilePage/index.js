/**
 *
 * ProfilePage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Button } from 'react-bootstrap';
import { makeSelectAvatar, makeSelectUpdateInfo } from './selectors';
import { makeSelectUser } from '../App/selectors';
import {
  updateProfileAction,
  updateAvatarAction,
  updateInfoChangeAction,
  unlinkThirdAction,
} from './actions';
import reducer from './reducer';
import saga from './saga';

import './styles.css';

import CurrentInfo from './CurrentInfo';
import UpdateForm from './UpdateForm';
import Modal from '../Modal';

export function ProfilePage({
  user,
  updateAvatar,
  updateProfile,
  updateInfoChange,
  updateInfo,
  unlinThird,
}) {
  ProfilePage.propTypes = {
    user: PropTypes.object,
    updateAvatar: PropTypes.func,
    updateProfile: PropTypes.func,
    updateInfoChange: PropTypes.func,
    updateInfo: PropTypes.object,
    unlinThird: PropTypes.func,
  };
  useInjectReducer({ key: 'profilePage', reducer });
  useInjectSaga({ key: 'profilePage', saga });

  const [GoogleLink, setGoogleLink] = useState(null);
  useEffect(() => {
    console.log(user);
    // check whether user is linked with google
    let googleIndex = -1;
    for (let i = 0; i < user.third.length; i += 1) {
      if (user.third[i].provider === 'google') {
        googleIndex = i;
        break;
      }
    }
    console.log(googleIndex);
    if (googleIndex === -1) setGoogleLink(null);
    else setGoogleLink(user.third[googleIndex]);
  }, [user, user.third]);
  const ggredirectUrl =
    process.env.NODE_ENV === 'production'
      ? `https://ricebookbz31.herokuapp.com/auth/link/google/${user.username}`
      : `http://localhost:8080/auth/link/google/${user.username}`;
  const linkOrUnlink = () => {
    if (GoogleLink === null) window.top.location = ggredirectUrl;
    else unlinThird(GoogleLink);
  };
  return (
    <div className="main-container clearfix">
      <Helmet>
        <title>ProfilePage</title>
        <meta name="description" content="Description of ProfilePage" />
      </Helmet>
      <Modal />
      <div className="profile-page-left-container">
        <div className="profile-page-avatar-container">
          <img
            src={user.avatar}
            alt="avatar"
            className="profile-page-avatar "
          />
          <input
            type="file"
            name="avatar"
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
        <UpdateForm
          updateInfo={updateInfo}
          updateProfile={updateProfile}
          updateInfoChange={updateInfoChange}
        />
        <Button style={{ marginLeft: '50px' }} onClick={linkOrUnlink}>
          {GoogleLink === null ? 'Link with Google' : 'Unlink from Google'}
        </Button>
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
  updateInfo: makeSelectUpdateInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateAvatar: event => dispatch(updateAvatarAction(event.target.files[0])),
    updateProfile: data => dispatch(updateProfileAction(data)),
    updateInfoChange: data => dispatch(updateInfoChangeAction(data)),
    unlinThird: data => dispatch(unlinkThirdAction(data)),
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
