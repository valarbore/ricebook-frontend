/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { UPDATE_AUTH, UPDATE_USER } from './constants';
// The initial state of the App
export const initialState = {
  auth: {
    token: null,
    id: null,
    isAuthenticated: false,
  },
  user: {
    id: '',
    username: '',
    avatar: null,
    email: '',
    phone: '',
    address: {
      zipcode: '',
      street: '',
    },
    status: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_AUTH:
        draft.auth = action.auth;
        break;
      case UPDATE_USER:
        console.log('updateUser', action.user);
        draft.user = Object.assign({}, state.user, action.user);
        break;
    }
  });

export default appReducer;
