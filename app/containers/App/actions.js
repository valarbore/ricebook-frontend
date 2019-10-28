import * as constants from './constants';

export function authenticateAction(auth) {
  return { type: constants.AUTHENTICATE, auth };
}
export function updateUserAction(user) {
  return {
    type: constants.UPDATE_USER,
    user,
  };
}

export function logoutAction(user) {
  return {
    type: constants.LOG_OUT,
    user,
  };
}

export function updateAuthAction(auth) {
  return {
    type: constants.UPDATE_AUTH,
    auth,
  };
}
