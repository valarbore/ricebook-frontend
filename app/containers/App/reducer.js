/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  UPDATE_PROFILE_SUCCESS,
  EMAIL,
  ZIPCODE,
  UPDATE_AVATAR_SUCCESS,
  UNLINK_THIRD_SUCCESS,
} from 'containers/ProfilePage/constants';
import { UPDATE_HEADLINE_SUCCESS } from 'containers/HomePage/constants';
import { UPDATE_AUTH, UPDATE_USER } from './constants';

// The initial state of the App
export const initialState = {
  isAuthenticated: null,
  profile: {
    username: '',
    avatar: null,
    email: '',
    dob: '',
    zipcode: '',
    headline: '',
    third: [],
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_AUTH:
        draft.isAuthenticated = action.auth;
        break;
      case UPDATE_USER:
        // console.log('updateUser', action.user);
        draft.profile = Object.assign({}, state.profile, action.user);
        break;
      case UPDATE_PROFILE_SUCCESS:
        if (action.data.type === EMAIL) draft.profile.email = action.data.data;
        else if (action.data.type === ZIPCODE)
          draft.profile.zipcode = action.data.data;
        break;
      case UPDATE_AVATAR_SUCCESS:
        draft.profile.avatar = action.avatar;
        break;
      case UPDATE_HEADLINE_SUCCESS:
        draft.profile.headline = action.data;
        break;
      case UNLINK_THIRD_SUCCESS:
        draft.profile.third = action.data;
    }
  });

export default appReducer;
