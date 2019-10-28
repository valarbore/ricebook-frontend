import { call, select, put, takeLatest, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { HANDLE_LOGIN, HANDLE_REGISTER } from './constants';
// import { UPDATE_AUTH, UPDATE_USER } from '../App/constants';
import * as selectors from './selectors';
import * as actions from './actions';
import * as globalActions from '../App/actions';
import messages from './messages';
// import avatar from '../../images/defaultAvatar.jpg';
import { STATUS } from '../../mock/status';
import { AVATARS } from '../../mock/avatar/avatars';
import request from '../../utils/request';
// Individual exports for testing
export function* handleLogin() {
  // todo
  // login success
  const loginInfo = yield select(selectors.makeSelectLoginInfo());
  const username = loginInfo.username.value;
  const password = loginInfo.password.value;
  const requestURL = `/users`;
  try {
    // get user
    const users = yield call(request, requestURL, {});
    // check username and password
    const loginUser = users.filter(
      user => username === user.username && password === user.address.street,
    );
    if (loginUser.length === 0) {
      yield put(
        actions.loginErrorAction(messages.loginErrorHint.defaultMessage),
      );
    } else {
      const { id } = loginUser[0];
      const user = Object.assign(loginUser[0], {
        status: STATUS[id % STATUS.length],
        avatar: AVATARS[id % AVATARS.length],
      });
      localStorage.setItem(
        'auth',
        JSON.stringify({
          token: 1,
          id: user.id,
          username: user.username,
        }),
      );
      localStorage.setItem('user', JSON.stringify(user));
      yield put(
        globalActions.updateAuthAction({
          token: 1,
          id: user.id,
          isAuthenticated: true,
        }),
      );
      yield put(globalActions.updateUserAction(user));
      yield put(actions.loginSuccessAction());
      yield put(push('/'));
    }
  } catch (err) {
    yield put(actions.loginErrorAction(err));
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
  let users = null;
  try {
    users = yield call(request, '/users', {});
    // check whether username exist
    const registerUser = users.filter(
      user => registerInfo.username.value === user.username,
    );
    if (registerUser.length === 0) {
      yield put(actions.registerSuccessAction());
    } else {
      yield put(
        actions.registerErrorAction(
          messages.registerErrorUserexistHint.defaultMessage,
        ),
      );
    }
  } catch (err) {
    yield put(actions.registerErrorAction(err));
  }

  // register success

  // localStorage.setItem(
  //   'auth',
  //   JSON.stringify({
  //     token: 1,
  //     id: 11,
  //     username: registerInfo.username.value,
  //   }),
  // );
  // const user = {
  //   id: '11',
  //   status: 'happy',
  //   username: registerInfo.username.value,
  //   email: registerInfo.email.value,
  //   phone: registerInfo.phone.value,
  //   address: { zipcode: registerInfo.zipcode.value, street: '123456' },
  //   avatar,
  // };
  // localStorage.setItem('user', JSON.stringify(user));
  // yield put({
  //   type: UPDATE_AUTH,
  //   auth: {
  //     token: 1,
  //     id: user.id,
  //     isAuthenticated: true,
  //   },
  // });
  // yield put({
  //   type: UPDATE_USER,
  //   user,
  // });
  // yield put(push('/'));
}
export function* watchHandleRegister() {
  yield takeLatest(HANDLE_REGISTER, handleRegister);
}
export default function* landingPageSaga() {
  // See example in containers/HomePage/saga.js
  yield all([watchHandleLogin(), watchHandleRegister()]);
}
