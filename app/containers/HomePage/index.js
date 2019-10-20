/**
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { makeSelectUser } from '../App/selectors';
import { updateUserAction, logoutAction } from '../App/actions';
import {
  makeSelectFriends,
  makeSelectPosts,
  makeSelectError,
} from './selectors';
import FriendList from './FriendList';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './style.css';
import UserStatus from './UserStatus';
import Footer from 'components/Footer';
import PostsList from './PostsList';
import Search from './Search';
import AddPost from './AddPost';

export function HomePage({
  user,
  friends,
  posts,
  updateUser,
  goProfile,
  logout,
  getFriends,
  addFriend,
  unfollowFriend,
  getPosts,
  searchPost,
  addPost,
  addFriendError,
}) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });
  // reques initial friend and posts
  useEffect(() => {
    getFriends(user.id);
    getPosts(user.id);
  }, [getFriends, getPosts, user.id]);
  return (
    <div className="main-container clearfix">
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Description of HomePage" />
      </Helmet>
      <div className="home-page-left">
        <UserStatus
          user={user}
          logout={logout}
          goProfile={goProfile}
          updateUser={updateUser}
        />
        <FriendList
          addFriendError={addFriendError}
          unfollowFriend={unfollowFriend}
          friends={friends}
          addFriend={addFriend}
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
  updateUser: PropTypes.func,
  goProfile: PropTypes.func,
  logout: PropTypes.func,
  getFriends: PropTypes.func,
  addFriend: PropTypes.func,
  unfollowFriend: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  friends: makeSelectFriends(),
  posts: makeSelectPosts(),
  addFriendError: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateUser: user => dispatch(updateUserAction(user)),
    goProfile: id => dispatch(push(`/profile/${id}`)),
    logout: user => dispatch(logoutAction(user)),
    getFriends: user => dispatch(actions.getFriendsAction(user)),
    addFriend: friend => dispatch(actions.addFriendAction(friend)),
    unfollowFriend: friend =>
      dispatch(actions.unfollowFriendSuccessAction(friend)),
    getPosts: data => dispatch(actions.getPostsAction(data)),
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
