import { select, call, all, put, takeLatest } from 'redux-saga/effects';
import { getDateFormat } from 'utils/date';
import * as actions from './actions';
import * as constants from './constants';
import request from '../../utils/request';
import { AVATARS } from '../../mock/avatar/avatars';
import { IMAGES } from '../../mock/postImages/images';
import { STATUS } from '../../mock/status';
import { DATES } from '../../mock/dates';
import { makeSelectUser } from '../App/selectors';
import { makeSelectFriends } from './selectors';
// export function* getFriends(action) {
//   // todo get friends from server
//   const url = '/users';
//   try {
//     const users = yield call(request, url, {});
//     const id = action.user;
//     const friendsId = [(id + 1) % 10, (id + 2) % 10, (id + 3) % 10];
//     const friends = users.filter(user => friendsId.indexOf(user.id) !== -1);
//     friends.map(friend =>
//       Object.assign(friend, {
//         avatar: AVATARS[friend.id % AVATARS.length],
//         status: STATUS[friend.id % STATUS.length],
//       }),
//     );
//     yield put(actions.getFriendsSuccessAction(friends));
//     yield getPosts();
//   } catch (err) {
//     yield put(actions.getFriendsErrorAction(err));
//   }
// }
// function* watchGetFriends() {
//   yield takeLatest(constants.GET_FRIENDS, getFriends);
// }
export function* addFriend(action) {
  const url = '/users';
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
        yield getPosts();
      }
    } else {
      yield put(
        actions.addFriendErrorAction(
          `Can't find ${action.friend}! Try other registered user.`,
        ),
      );
    }
  } catch (err) {
    yield put(actions.addFriendErrorAction(err));
  }
}
export function* watchAddFriend() {
  yield takeLatest(constants.ADD_FRIEND, addFriend);
}
export function* unfollowFriend(action) {
  yield put(actions.unfollowFriendSuccessAction(action.friend));
  yield getPosts();
}
export function* watchUnfollowFriend() {
  yield takeLatest(constants.UNFOLLOW_FRIEND, unfollowFriend);
}
export function* getPosts() {
  // todo get posts from server
  const url = '/posts';
  try {
    const friends = yield select(makeSelectFriends());
    const user = yield select(makeSelectUser());
    const allComments = yield call(request, '/comments', {});
    const posts = yield call(request, url, {});
    const currentPosts = [];
    // eslint-disable-next-line no-plusplus
    for (let j = 0; j < posts.length; j++) {
      if (user.id === posts[j].userId) {
        const comments = allComments.filter(
          comment => comment.postId === posts[j].id,
        );
        currentPosts.push(
          Object.assign(posts[j], {
            author: { username: user.username, avatar: user.avatar },
            image: IMAGES[posts[j].id % IMAGES.length],
            publishDate: DATES[posts[j].id % DATES.length],
            comments,
          }),
        );
        // eslint-disable-next-line no-continue
        continue;
      }
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < friends.length; i++) {
        if (friends[i].id === posts[j].userId) {
          const comments = allComments.filter(
            comment => comment.postId === posts[j].id,
          );
          currentPosts.push(
            Object.assign(posts[j], {
              author: {
                username: friends[i].username,
                avatar: friends[i].avatar,
              },
              image: IMAGES[(posts[j].id + friends[i].id) % IMAGES.length],
              publishDate: DATES[posts[j].id % DATES.length],
              comments,
            }),
          );
          break;
        }
      }
    }
    currentPosts.sort((post1, post2) => {
      if (post1.publishDate > post2.publishDate) return -1;
      if (post1.publishDate < post2.publishDate) return 1;
      return 0;
    });
    localStorage.setItem('posts', JSON.stringify(currentPosts));
    yield put(actions.getPostsSuccessAction(currentPosts));
  } catch (error) {
    yield put(actions.getPostsErrorAction(error));
  }
  // yield put(actions.getPostsSuccessAction(posts));
}
export function* watchGetPosts() {
  yield takeLatest(constants.GET_POSTS, getPosts);
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
    comments: [],
  });
  posts.unshift(newPost);
  localStorage.setItem('posts', JSON.stringify(posts));
  yield put(actions.addPostSuccessAction(newPost));
}
export function* watchAddPost() {
  yield takeLatest(constants.ADD_POST, addPost);
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
export function* watchSearchPost() {
  yield takeLatest(constants.SEARCH_POST, searchPost);
}
// Individual exports for testing
export default function* homePageSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    // watchGetFriends(),
    watchAddFriend(),
    watchGetPosts(),
    watchAddPost(),
    watchSearchPost(),
    watchUnfollowFriend(),
  ]);
}
