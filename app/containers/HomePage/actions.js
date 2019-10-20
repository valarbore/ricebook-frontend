/*
 *
 * HomePage actions
 *
 */

import * as constants from './constants';

export function getFriendsAction(user) {
  return {
    type: constants.GET_FRIENDS,
    user,
  };
}

export function getFriendsSuccessAction(friends) {
  return {
    type: constants.GET_FRIENDS_SUCCESS,
    friends,
  };
}

export function getFriendsErrorAction(error) {
  return {
    type: constants.GET_FRIENDS_ERROR,
    error,
  };
}

export function addFriendAction(friend) {
  return {
    type: constants.ADD_FRIEND,
    friend,
  };
}
export function addFriendErrorAction(error) {
  return {
    type: constants.ADD_FRIEND_ERROR,
    error,
  };
}
export function addFriendSuccessAction(friend) {
  return {
    type: constants.ADD_FRIEND_SUCCESS,
    friend,
  };
}

export function unfollowFriendSuccessAction(friend) {
  return {
    type: constants.UNFOLLOW_FRIEND_SUCCESS,
    friend,
  };
}

// get posts
export function getPostsAction(data) {
  return {
    type: constants.GET_POSTS,
    data,
  };
}
export function getPostsSuccessAction(data) {
  return {
    type: constants.GET_POSTS_SUCCESS,
    data,
  };
}
export function getPostsErrorAction(data) {
  return {
    type: constants.GET_POSTS_ERROR,
    data,
  };
}
// add posts
export function addPostAction(data) {
  return {
    type: constants.ADD_POST,
    data,
  };
}
export function addPostSuccessAction(data) {
  return {
    type: constants.ADD_POST_SUCCESS,
    data,
  };
}
export function addPostErrorAction(data) {
  return {
    type: constants.ADD_POST_ERROR,
    data,
  };
}
// search posts
export function searchPostAction(data) {
  return {
    type: constants.SEARCH_POST,
    data,
  };
}
export function searchPostSuccessAction(data) {
  return {
    type: constants.SEARCH_POST_SUCCESS,
    data,
  };
}
export function searchPostErrorAction(data) {
  return {
    type: constants.SEARCH_POST_ERROR,
    data,
  };
}
