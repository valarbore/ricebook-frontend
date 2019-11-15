/**
 *
 * HomePage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { makeSelectUser } from '../App/selectors';
import { logoutAction } from '../App/actions';
import {
  makeSelectFriends,
  makeSelectPosts,
  makeSelectError,
} from './selectors';
import FriendList from './FriendList';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import './style.css';
import UserStatus from './UserStatus';
import PostsList from './PostsList';
import Search from './Search';
import AddPost from './AddPost';
import Modal from '../Modal';

export function HomePage({
  user,
  friends,
  posts,
  updateHeadline,
  goProfile,
  logout,
  getFollowing,
  follow,
  unfollow,
  searchPost,
  addPost,
  addFriendError,
}) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });
  // reques initial friend and posts
  useEffect(() => {
    getFollowing();
    // getPosts(user.id);
  }, [getFollowing]);
  return (
    <div className="main-container clearfix" id="home-page">
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Description of HomePage" />
      </Helmet>
      <Modal />
      <div className="home-page-left">
        <UserStatus
          user={user}
          logout={logout}
          goProfile={goProfile}
          updateHeadline={updateHeadline}
        />
        <FriendList
          addFriendError={addFriendError}
          unfollowFriend={unfollow}
          friends={friends}
          addFriend={follow}
        />
      </div>
      <div className="home-page-right">
        <AddPost addPost={addPost} />
        <Search searchPost={searchPost} />
        <PostsList posts={posts} />
      </div>
    </div>
  );
}

HomePage.propTypes = {
  user: PropTypes.object,
  friends: PropTypes.array,
  posts: PropTypes.array,
  updateHeadline: PropTypes.func,
  goProfile: PropTypes.func,
  logout: PropTypes.func,
  getFollowing: PropTypes.func,
  follow: PropTypes.func,
  unfollow: PropTypes.func,
  searchPost: PropTypes.func,
  addPost: PropTypes.func,
  addFriendError: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  friends: makeSelectFriends(),
  posts: makeSelectPosts(),
  addFriendError: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateHeadline: headline =>
      dispatch(actions.updateHeadlineAction(headline)),
    goProfile: id => dispatch(push(`/profile/${id}`)),
    logout: user => dispatch(logoutAction(user)),
    getFollowing: () => dispatch(actions.getFollowingAction()),
    follow: user => dispatch(actions.followAction(user)),
    unfollow: user => dispatch(actions.unfollowAction(user)),
    addPost: data => dispatch(actions.addPostAction(data)),
    searchPost: data => dispatch(actions.searchPostAction(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
