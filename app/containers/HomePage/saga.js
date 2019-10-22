import { take, select, call, all, put, takeLatest } from 'redux-saga/effects';
import { getDateFormat } from 'utils/date';
import * as actions from './actions';
import * as constans from './constants';
import request from '../../utils/request';
import { AVATARS } from '../../mock/avatar/avatars';
import { IMAGES } from '../../mock/postImages/images';
import { STATUS } from '../../mock/status';
import { DATES } from '../../mock/dates';
import { makeSelectUser } from '../App/selectors';
import { makeSelectPosts, makeSelectFriends } from './selectors';
export function* getFriends(action) {
  // todo get friends from server
  const url = 'https://jsonplaceholder.typicode.com/users';
  try {
    const users = yield call(request, url, {});
    const id = action.user;
    const friendsId = [(id + 1) % 10, (id + 2) % 10, (id + 3) % 10];
    const friends = users.filter(user => friendsId.indexOf(user.id) !== -1);
    friends.map(friend =>
      Object.assign(friend, {
        avatar: AVATARS[friend.id % AVATARS.length],
        status: STATUS[friend.id % STATUS.length],
      }),
    );
    yield put(actions.getFriendsSuccessAction(friends));
  } catch (err) {
    yield put(actions.getFriendsErrorAction(err));
  }
}
function* watchGetFriends() {
  yield takeLatest(constans.GET_FRIENDS, getFriends);
}
export function* addFriend(action) {
  const url = 'https://jsonplaceholder.typicode.com/users';
  try {
    const users = yield call(request, url, {});
    const friend = users.filter(
      user => action.friend.toLowerCase() === user.username.toLowerCase(),
    );
    if (friend.length > 0) {
      const user = yield select(makeSelectUser());
      const friends = yield select(makeSelectFriends());
      const newFriend = friend[0];
      if (newFriend.id === user.id) {
        yield put(actions.addFriendErrorAction(`You can't add yourself`));
      } else if (friends.filter(f => f.id === newFriend.id).length > 0) {
        yield put(
          actions.addFriendErrorAction(
            `You already have friend ${action.friend}`,
          ),
        );
      } else {
        yield put(
          actions.addFriendSuccessAction(
            Object.assign(friend[0], {
              avatar: AVATARS[friend[0].id % AVATARS.length],
              status: STATUS[friend[0].id % STATUS.length],
            }),
          ),
        );
      }
    } else {
      yield put(
        actions.addFriendErrorAction(
          `Can't find ${action.friend}! Try other registered user.`,
        ),
      );
    }
  } catch (err) {
    yield put(actions.getFriendsErrorAction(err));
  }
}
function* watchAddFriend() {
  yield takeLatest(constans.ADD_FRIEND, addFriend);
}
export function* getPosts(action) {
  // todo get posts from server
  const url = 'https://jsonplaceholder.typicode.com/posts';
  try {
    const posts = yield call(request, url, {});
    const user = yield select(makeSelectUser());
    const currentPosts = posts.filter(post => post.userId === user.id);
    currentPosts.map(post => {
      Object.assign(post, {
        author: { username: user.username, avatar: user.avatar },
        image: IMAGES[post.id % IMAGES.length],
        publishDate: DATES[post.id - 1],
      });
    });
    localStorage.setItem('posts', JSON.stringify(currentPosts));
    yield put(actions.getPostsSuccessAction(currentPosts));
  } catch (error) {
    yield put(actions.getPostsErrorAction(error));
  }
  // yield put(actions.getPostsSuccessAction(posts));
}
function* watchGetPosts() {
  yield takeLatest(constans.GET_POSTS, getPosts);
}

export function* addPost(action) {
  // todo post post to server
  const posts = JSON.parse(localStorage.getItem('posts'));
  const user = yield select(makeSelectUser());
  const id = posts.length + 1;
  const date = getDateFormat();
  const newPost = Object.assign(action.data, {
    author: { username: user.username, avatar: user.avatar },
    publishDate: date,
    id,
  });
  posts.unshift(newPost);
  localStorage.setItem('posts', JSON.stringify(posts));
  yield put(actions.addPostSuccessAction(newPost));
}
function* watchAddPost() {
  yield takeLatest(constans.ADD_POST, addPost);
}

export function* searchPost(action) {
  // todo search posts from server
  const reg = new RegExp(action.data, 'i');
  const posts = JSON.parse(localStorage.getItem('posts'));
  const results = posts.filter(
    post =>
      reg.test(post.title) ||
      reg.test(post.body) ||
      reg.test(post.author.username),
  );
  yield put(actions.searchPostSuccessAction(results));
}
function* watchSearchPost() {
  yield takeLatest(constans.SEARCH_POST, searchPost);
}
// Individual exports for testing
export default function* homePageSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    watchGetFriends(),
    watchAddFriend(),
    watchGetPosts(),
    watchAddPost(),
    watchSearchPost(),
  ]);
}
