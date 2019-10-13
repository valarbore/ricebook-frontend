/**
 * Gets the repositories of the user from Github
 */

import { call, put, all, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import * as contants from './constants';

/**
 * authenticate user by using token and id
 */
function* authenticate() {
  // todo
}
function* watchAuthenticate() {
  yield takeLatest(contants.AUTHENTICATE, authenticate);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSage() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([watchAuthenticate()]);
}
