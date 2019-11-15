import { call, select, put, takeLatest, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { UNKNOW_ERROR } from 'containers/App/constants';
import { HANDLE_LOGIN, HANDLE_REGISTER } from './constants';
// import { UPDATE_AUTH, UPDATE_USER } from '../App/constants';
import * as selectors from './selectors';
import * as actions from './actions';
import * as globalActions from '../App/actions';
import request from '../../utils/request';
// Individual exports for testing
export function* handleLogin(action) {
  // get login info
  const loginInfo = yield select(selectors.makeSelectLoginInfo());
  const data = {
    username: loginInfo.username,
    password: loginInfo.password,
  };
  try {
    // login
    const response = yield call(request, '/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (response.code === 0) {
      // login successful
      yield put(globalActions.updateAuthAction(true));
      yield put(globalActions.updateUserAction(response.data));
      yield put(actions.loginSuccessAction());
      yield put(push(action.path));
    } else {
      yield put(actions.loginErrorAction(response.msg));
    }
  } catch (err) {
    yield put(actions.loginErrorAction(UNKNOW_ERROR));
  }
}
export function* watchHandleLogin() {
  yield takeLatest(HANDLE_LOGIN, handleLogin);
}
/**
 * register
 * @param {*} action register info
 */
export function* handleRegister() {
  // todo
  const registerInfo = yield select(selectors.makeSelectRegisterInfo());
  const newUser = {
    username: registerInfo.username,
    email: registerInfo.email,
    dob: registerInfo.dob,
    zipcode: registerInfo.zipcode,
    password: registerInfo.password,
  };
  try {
    const response = yield call(request, '/register', {
      method: 'POST',
      body: JSON.stringify(newUser),
    });
    if (response.code === 0) {
      // register successful
      yield put(actions.registerSuccessAction());
    } else {
      // register error
      yield put(actions.registerErrorAction(response.msg));
    }
  } catch (err) {
    yield put(actions.registerErrorAction(UNKNOW_ERROR));
  }
}
export function* watchHandleRegister() {
  yield takeLatest(HANDLE_REGISTER, handleRegister);
}
export default function* landingPageSaga() {
  // See example in containers/HomePage/saga.js
  yield all([watchHandleLogin(), watchHandleRegister()]);
}
