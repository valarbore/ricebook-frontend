import { call, put, takeLatest, all } from 'redux-saga/effects';
import {
  EMAIL,
  ZIPCODE,
  PASSWORD,
  UPDATE_PROFILE,
  UPDATE_AVATAR,
  UNLINK_THIRD,
} from './constants';
import { showErrorAction, showSuceessAction } from '../Modal/actions';
import { UNKNOW_ERROR } from '../App/constants';
import request from '../../utils/request';
import {
  updateProfileSuccessAction,
  updateAvatarSuccessAction,
  unlinkThirdSuccessAction,
} from './actions';

/**
 * update profile info
 * @param {*} action
 */
export function* updateProfile(action) {
  const { type, data } = action.data;
  try {
    let response;
    switch (type) {
      case EMAIL:
        response = yield call(request, '/email', {
          method: 'PUT',
          body: JSON.stringify({ email: data }),
        });
        if (response.code === 0) {
          yield put(updateProfileSuccessAction({ type, data: response.data }));
        } else {
          yield put(showErrorAction(`Update ${type} fail! ${response.msg}`));
        }
        break;
      case ZIPCODE:
        response = yield call(request, '/zipcode', {
          method: 'PUT',
          body: JSON.stringify({ zipcode: data }),
        });
        if (response.code === 0) {
          yield put(updateProfileSuccessAction({ type, data: response.data }));
        } else {
          yield put(showErrorAction(`Update ${type} fail! ${response.msg}`));
        }
        break;
      case PASSWORD:
        response = yield call(request, '/password', {
          method: 'PUT',
          body: JSON.stringify({ password: data }),
        });
        if (response.code === 0) {
          yield put(updateProfileSuccessAction({ type, data: response.data }));
          yield put(showSuceessAction(`Update password success!`));
        } else {
          yield put(showErrorAction(`Update ${type} fail! ${response.msg}`));
        }
        break;
      default:
        break;
    }
  } catch (err) {
    yield put(showErrorAction(UNKNOW_ERROR));
  }
}
export function* watchUpdateProfile() {
  yield takeLatest(UPDATE_PROFILE, updateProfile);
}
/**
 * update avater
 * @param {*} action
 */
function* updateAvatar(action) {
  try {
    const formData = new FormData();
    formData.append('avatar', action.avatar);
    const response = yield call(request, '/avatar', {
      method: 'PUT',
      headers: {},
      body: formData,
    });
    if (response.code === 0) {
      yield put(updateAvatarSuccessAction(response.data));
    } else {
      yield put(showErrorAction(`Update avatar fail! ${response.msg}`));
    }
  } catch (err) {
    yield put(showErrorAction(UNKNOW_ERROR));
  }
}

function* watchUpdateAvatar() {
  yield takeLatest(UPDATE_AVATAR, updateAvatar);
}

function* unlinkThird(action) {
  try {
    const res = yield call(request, '/unlink', {
      method: 'PUT',
      body: JSON.stringify(action.data),
    });
    if (res.code === 0) {
      yield put(unlinkThirdSuccessAction(res.data));
    } else {
      yield put(showErrorAction(`Unlink Fail! ${res.msg}`));
    }
  } catch (err) {
    yield put(showErrorAction(UNKNOW_ERROR));
  }
}

function* watchUnlinkThird() {
  yield takeLatest(UNLINK_THIRD, unlinkThird);
}
// Individual exports for testing
export default function* profilePageSaga() {
  // See example in containers/HomePage/saga.js
  yield all([watchUpdateProfile(), watchUpdateAvatar(), watchUnlinkThird()]);
}
