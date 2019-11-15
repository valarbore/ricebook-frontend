/*
 *
 * HomePage actions
 *
 */

import * as constants from './constants';

export function getFollowingAction() {
  return {
    type: constants.GET_FOLLOWING,
  };
}

export function getFollowingSuccessAction(following) {
  return {
    type: constants.GET_FOLLOWING_SUCCESS,
    following,
  };
}

export function followAction(user) {
  return {
    type: constants.FOLLOW,
    user,
  };
}

export function unfollowAction(user) {
  return {
    type: constants.UNFOLLOW,
    user,
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

export function updateHeadlineAction(data) {
  return {
    type: constants.UPDATE_HEADLINE,
    data,
  };
}

export function updateHeadlineSuccessAction(data) {
  return {
    type: constants.UPDATE_HEADLINE_SUCCESS,
    data,
  };
}
