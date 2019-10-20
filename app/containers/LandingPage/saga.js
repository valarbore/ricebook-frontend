import { take, call, put, takeLatest, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { HANDLE_LOGIN, HANDLE_REGISTER } from './constants';
import { UPDATE_AUTH, UPDATE_USER } from '../App/constants';
import * as actions from './actions';
import avatar from '../../images/defaultAvatar.jpg';
import { STATUS } from '../../mock/status';
import { AVATARS } from '../../mock/avatar/avatars';
import request from '../../utils/request';
// Individual exports for testing
export function* handleLogin(action) {
  // todo
  // login success
  const username = action.loginInfo.username.value;
  const password = action.loginInfo.password.value;
  const requestURL = `https://jsonplaceholder.typicode.com/users`;
  try {
    // get user
    const users = yield call(request, requestURL, {});
    // check username and password
    const loginUser = users.filter(
      user => username === user.username && password === user.address.street,
    );
    if (loginUser.length === 0) {
      yield put(
        actions.loginErrorAction(
          'Username or Password wrong! Try username: Bret password: Kulas Light',
        ),
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
      yield put({
        type: UPDATE_AUTH,
        auth: {
          token: 1,
          id: 1,
          isAuthenticated: true,
        },
      });
      yield put({
        type: UPDATE_USER,
        user,
      });
      yield put(actions.loginSuccessAction());
      yield put(push('/'));
    }
  } catch (err) {
    yield put(actions.loginErrorAction(err));
  }
}
function* watchHandleLogin() {
  yield takeLatest(HANDLE_LOGIN, handleLogin);
}
export function* handleRegister(action) {
  // todo
  // register success
  localStorage.setItem(
    'auth',
    JSON.stringify({
      token: 1,
      id: 11,
      username: action.registerInfo.username.value,
    }),
  );
  const user = {
    id: '11',
    status: 'happy',
    username: action.registerInfo.username.value,
    email: action.registerInfo.email.value,
    phone: action.registerInfo.phone.value,
    zipcode: action.registerInfo.zipcode.value,
    avatar,
  };
  localStorage.setItem('user', JSON.stringify(user));
  yield put({
    type: UPDATE_AUTH,
    auth: {
      token: 1,
      id: user.id,
      isAuthenticated: true,
    },
  });
  yield put({
    type: UPDATE_USER,
    user,
  });
  yield put(push('/'));
}
function* watchHandleRegister() {
  yield takeLatest(HANDLE_REGISTER, handleRegister);
}
export default function* landingPageSaga() {
  // See example in containers/HomePage/saga.js
  yield all([watchHandleLogin(), watchHandleRegister()]);
}
