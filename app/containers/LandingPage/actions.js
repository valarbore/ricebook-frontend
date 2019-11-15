/*
 *
 * LandingPage actions
 *
 */

import * as constants from './constants';

export function changeTypeAction() {
  return {
    type: constants.CHANGE_TYPE,
  };
}

export function loginAction(loginInfo, from) {
  return {
    type: constants.HANDLE_LOGIN,
    loginInfo,
    path: from,
  };
}
export function loginErrorAction(error) {
  return {
    type: constants.LOGIN_ERROR,
    error,
  };
}
export function loginSuccessAction() {
  return {
    type: constants.LOGIN_SUCCESS,
  };
}
export function setLoginInfoAction(key, value) {
  return {
    type: constants.SET_LOGIN_INFO,
    key,
    value,
  };
}

export function setRegisterInfoAction(key, value) {
  return {
    type: constants.SET_REGISTER_INFO,
    key,
    value,
  };
}

export function setRegisterInfoValidAction(key, value) {
  return {
    type: constants.SET_REGISTER_INFO_VALID,
    key,
    value,
  };
}

export function registerAction(registerInfo) {
  return { type: constants.HANDLE_REGISTER, registerInfo };
}

export function registerSuccessAction() {
  return { type: constants.REGISTER_SUCCESS };
}

export function registerErrorAction(errorHint) {
  return { type: constants.REGISTER_ERROR, errorHint };
}
