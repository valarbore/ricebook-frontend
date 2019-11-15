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
    username: '',
    password: '',
  },
  registerInfo: {
    hasError: false,
    showHingt: false,
    hint: '',
    username: {
      value: '',
    },
    email: '',
    password: '',
    passwordConfirm: '',
    passwordError: false,
    dob: '',
    dobError: false,
    zipcode: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const landingPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.CHANGE_TYPE:
        draft.currentType =
          state.currentType === 'login' ? 'register' : 'login';
        draft.registerInfo.showHingt = false;
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
        draft.loginInfo[action.key] = action.value;
        break;
      case constants.SET_REGISTER_INFO:
        draft.registerInfo[action.key] = action.value;
        break;
      case constants.SET_REGISTER_INFO_VALID:
        draft.registerInfo[action.key] = action.value;
        break;
      case constants.REGISTER_SUCCESS:
        draft.registerInfo.hasError = false;
        draft.registerInfo.showHingt = true;
        draft.registerInfo.hint = 'Register Success! Go to Login!';
        break;
      case constants.REGISTER_ERROR:
        draft.registerInfo.hasError = true;
        draft.registerInfo.showHingt = true;
        draft.registerInfo.hint = action.errorHint;
        break;
    }
  });

export default landingPageReducer;
