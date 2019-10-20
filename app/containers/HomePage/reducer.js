/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import * as constants from './constants';

export const initialState = {
  friends: [],
  posts: [],
  errors: {
    addFriendErrorFlag: false,
    addFriendErrorHint: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.GET_FRIENDS_SUCCESS:
        draft.friends = action.friends;
        break;
      case constants.ADD_FRIEND_SUCCESS:
        draft.friends.push(action.friend);
        break;
      case constants.ADD_FRIEND_ERROR:
        draft.errors.addFriendErrorFlag = !state.errors.addFriendErrorFlag;
        draft.errors.addFriendErrorHint = action.error;
        break;
      case constants.UNFOLLOW_FRIEND_SUCCESS:
        draft.friends = state.friends.filter(
          friend => friend.id !== action.friend.id,
        );
        break;
      case constants.GET_POSTS_SUCCESS:
        draft.posts = action.data;
        break;
      case constants.ADD_POST_SUCCESS:
        draft.posts.unshift(action.data);
        break;
      case constants.SEARCH_POST_SUCCESS:
        draft.posts = action.data;
        break;
    }
  });

export default homePageReducer;
