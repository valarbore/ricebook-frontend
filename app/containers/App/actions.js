import * as contants from './constants';
export function updateUserAction(user) {
  return {
    type: contants.UPDATE_USER,
    user,
  };
}

export function logoutAction(user) {
  return {
    type: contants.LOG_OUT,
    user,
  };
}
