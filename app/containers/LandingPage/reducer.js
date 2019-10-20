/*
 *
 * LandingPage reducer
 *
 */
import produce from 'immer';
import * as constants from './constants';

export const initialState = {
  currentType: 'login',
  loginInfo: {
    hasError: false,
    errorHint: '',
    username: {
      value: '',
    },
    password: {
      value: '',
    },
  },
  registerInfo: {
    username: {
      value: '',
    },
    email: {
      value: '',
    },
    password: {
      value: '',
    },
    passwordConfirm: {
      value: '',
      isValid: true,
    },
    phone: {
      value: '',
      isValid: true,
    },
    zipcode: {
      value: '',
      isValid: true,
    },
  },
};

/* eslint-disable default-case, no-param-reassign */
const landingPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.CHANGE_TYPE:
        draft.currentType =
          state.currentType === 'login' ? 'register' : 'login';
        break;
      case constants.LOGIN_ERROR:
        draft.loginInfo.hasError = true;
        draft.loginInfo.errorHint = action.error;
        break;
      case constants.LOGIN_SUCCESS:
        draft.loginInfo.hasError = false;
        draft.loginInfo.errorHint = '';
        break;
      case constants.SET_LOGIN_INFO:
        draft.loginInfo[action.key].value = action.value;
        break;
      case constants.SET_REGISTER_INFO:
        draft.registerInfo[action.key].value = action.value;
        break;
      case constants.SET_REGISTER_INFO_VALID:
        draft.registerInfo[action.key].isValid = action.value;
        break;
    }
  });

export default landingPageReducer;
