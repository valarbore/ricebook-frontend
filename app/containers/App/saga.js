/**
 * Gets the repositories of the user from Github
 */

import { call, put, all, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'connected-react-router';
import * as contants from './constants';
import avatar from '../../images/defaultAvatar.jpg';
/**
 * authenticate user by using token and id
 */
function* authenticate(action) {
  // todo
  const auth = JSON.parse(action.auth);
  const user = JSON.parse(localStorage.getItem('user'));
  yield put({
    type: contants.UPDATE_AUTH,
    auth: {
      token: 1,
      id: auth.id,
      isAuthenticated: true,
    },
  });
  yield put({
    type: contants.UPDATE_USER,
    user,
  });
}
function* watchAuthenticate() {
  yield takeLatest(contants.AUTHENTICATE, authenticate);
}
/**
 * user log out
 */
export function* logout(action) {
  // todo notify server log out
  // clear localstorage
  localStorage.removeItem('auth');
  localStorage.removeItem('user');
  // redirect to landingpage
  yield put(push('/landing'));
}

function* watchLogout() {
  yield takeLatest(contants.LOG_OUT, logout);
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSage() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([watchAuthenticate(), watchLogout()]);
}
