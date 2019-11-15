import { call, all, put, takeLatest, select } from 'redux-saga/effects';
import { UNKNOW_ERROR } from 'containers/App/constants';
import * as actions from './actions';
import * as constants from './constants';
import request from '../../utils/request';
import { showErrorAction } from '../Modal/actions';
import { makeSelectPosts } from './selectors';
/**
 * get following list and get according posts
 */
export function* getFollowing() {
  try {
    const response = yield call(request, '/following/', {});
    if (response.code === 0) {
      yield put(actions.getFollowingSuccessAction(response.data));
      yield getPosts();
    } else {
      yield put(
        showErrorAction(`Request following list fail! ${response.msg}`),
      );
    }
  } catch (err) {
    yield put(showErrorAction(UNKNOW_ERROR));
  }
}
function* watchGetFollowing() {
  yield takeLatest(constants.GET_FOLLOWING, getFollowing);
}
/**
 * follow a user
 * @param {*} action
 */
export function* follow(action) {
  try {
    const response = yield call(request, `/following/${action.user}`, {
      method: 'PUT',
    });
    if (response.code === 0) {
      yield put(actions.getFollowingSuccessAction(response.data));
      yield getPosts();
    } else {
      yield put(
        showErrorAction(`Request follow ${action.user} fail! ${response.msg}`),
      );
    }
  } catch (err) {
    yield put(showErrorAction(UNKNOW_ERROR));
  }
}
export function* watchFollow() {
  yield takeLatest(constants.FOLLOW, follow);
}
/**
 * unfollow a user
 * @param {*} action
 */
export function* unfollow(action) {
  try {
    const response = yield call(request, `/following/${action.user}`, {
      method: 'DELETE',
    });
    if (response.code === 0) {
      yield put(actions.getFollowingSuccessAction(response.data));
      yield getPosts();
    } else {
      yield put(
        showErrorAction(
          `Request unfollow ${action.user} fail! ${response.msg}`,
        ),
      );
    }
  } catch (err) {
    yield put(showErrorAction(UNKNOW_ERROR));
  }
}
export function* watchUnfollow() {
  yield takeLatest(constants.UNFOLLOW, unfollow);
}
/**
 * get articles
 */
export function* getPosts() {
  // get articles from server
  try {
    const response = yield call(request, `/article`, {});
    if (response.code === 0) {
      yield put(actions.getPostsSuccessAction(response.data));
    } else {
      yield put(showErrorAction(`Request articles fail! ${response.msg}`));
    }
  } catch (error) {
    yield put(showErrorAction(UNKNOW_ERROR));
  }
}
export function* watchGetPosts() {
  yield takeLatest(constants.GET_POSTS, getPosts);
}
/**
 * add article
 * @param {*} action
 */
export function* addPost(action) {
  // get articles from server
  try {
    const response = yield call(request, `/article`, {
      method: 'POST',
      headers: {},
      body: action.data,
    });
    if (response.code === 0) {
      yield put(actions.addPostSuccessAction(response.data));
    } else {
      yield put(showErrorAction(`Request articles fail! ${response.msg}`));
    }
  } catch (error) {
    yield put(showErrorAction(UNKNOW_ERROR));
  }
}
export function* watchAddPost() {
  yield takeLatest(constants.ADD_POST, addPost);
}

export function* searchPost(action) {
  const reg = new RegExp(action.data, 'i');
  // todo search posts from server
  yield getPosts();
  const posts = yield select(makeSelectPosts());
  const results = posts.filter(
    post => reg.test(post.head) || reg.test(post.text) || reg.test(post.author),
  );
  yield put(actions.searchPostSuccessAction(results));
}
export function* watchSearchPost() {
  yield takeLatest(constants.SEARCH_POST, searchPost);
}

function* updateHeadline(action) {
  try {
    const response = yield call(request, '/headline', {
      method: 'PUT',
      body: JSON.stringify({ headline: action.data }),
    });
    if (response.code === 0) {
      yield put(actions.updateHeadlineSuccessAction(response.data));
    } else {
      yield put(showErrorAction(`Update headline fail! ${response.msg}`));
    }
  } catch (err) {
    yield put(showErrorAction(UNKNOW_ERROR));
  }
}

function* watchUpdateHeadline() {
  yield takeLatest(constants.UPDATE_HEADLINE, updateHeadline);
}
// Individual exports for testing
export default function* homePageSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    watchGetFollowing(),
    watchFollow(),
    watchGetPosts(),
    watchAddPost(),
    watchSearchPost(),
    watchUnfollow(),
    watchUpdateHeadline(),
  ]);
}
