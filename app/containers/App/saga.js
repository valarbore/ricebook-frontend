/**
 * Gets the repositories of the user from Github
 */

import { put, all, takeLatest, call } from 'redux-saga/effects';

import { push } from 'connected-react-router';
import * as contants from './constants';
import * as actions from './actions';
import request from '../../utils/request';

/**
 * authenticate user by using token and id
 */
export function* authenticate() {
  try {
    const response = yield call(request, '/auth', {});
    if (response.code === 0) {
      // has authority
      yield put(actions.updateAuthAction(true));
      yield put(actions.updateUserAction(response.data));
    } else {
      // no authority
      yield put(actions.updateAuthAction(false));
    }
  } catch (err) {
    // todo err page
    yield put(actions.updateAuthAction(false));
  }

  // yield put(actions.updateUserAction(user));
}
export function* watchAuthenticate() {
  yield takeLatest(contants.AUTHENTICATE, authenticate);
}
/**
 * user log out
 */
export function* logout() {
  // todo notify server log out
  // clear localstorage
  // redirect to landingpage
  yield put(push('/landing'));
}

export function* watchLogout() {
  yield takeLatest(contants.LOG_OUT, logout);
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* appSage() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([watchAuthenticate(), watchLogout()]);
}
