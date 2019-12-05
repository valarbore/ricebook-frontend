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
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.GET_FOLLOWING_SUCCESS:
        draft.friends = action.following;
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
      case constants.UPDATE_POST_SUCCESS:
        draft.posts = state.posts.map(post => {
          console.log('update success');
          // eslint-disable-next-line no-underscore-dangle
          if (post._id === action.post._id) return action.post;
          return post;
        });
        break;
    }
  });

export default homePageReducer;
