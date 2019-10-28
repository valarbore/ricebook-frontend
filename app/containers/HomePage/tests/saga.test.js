/**
 * Tests for HomePage sagas
 */

import { all, put, takeLatest } from 'redux-saga/effects';

import * as constants from '../constants';
import * as actions from '../actions';
// import messages from '../messages';
import homePageSaga, * as sagas from '../saga';
import { AVATARS } from '../../../mock/avatar/avatars';
import { IMAGES } from '../../../mock/postImages/images';
import { STATUS } from '../../../mock/status';
import { DATES } from '../../../mock/dates';
import { getDateFormat } from '../../../utils/date';
const users = [
  {
    id: 1,
    username: 'Bret',
  },
  {
    id: 2,
    username: 'Antonette',
  },
  { id: 3, username: 'Samantha' },
];
const user = {
  id: 1,
  username: 'Bret',
};
const friends = [{ id: 3, username: 'Samantha' }];
/* eslint-disable redux-saga/yield-effects */
describe('addFriend Saga', () => {
  const validFirend = {
    friend: 'Antonette',
  };
  const invalidNotFound = {
    friend: 'BB',
  };
  const invalidSelf = {
    friend: 'Bret',
  };
  const invalidExist = {
    friend: 'Samantha',
  };
  let generator;

  it('should dispatch the addFriendSuccessAction if username and new friend is a registered user', () => {
    generator = sagas.addFriend(validFirend);
    generator.next(); // call get users
    generator.next(users); // select current user
    generator.next(user); // select current friends
    const putDescriptor = generator.next(friends).value; // put addFriend success
    expect(putDescriptor).toEqual(
      put(
        actions.addFriendSuccessAction(
          Object.assign(users[1], {
            avatar: AVATARS[users[1].id % AVATARS.length],
            status: STATUS[users[1].id % STATUS.length],
          }),
        ),
      ),
    );
  });

  it('add not found friend should dispatch addFriendErrorAction', () => {
    generator = sagas.addFriend(invalidNotFound);
    generator.next(); // call get users
    const putDescriptor = generator.next(users).value; // put addFriend error
    expect(putDescriptor).toEqual(
      put(
        actions.addFriendErrorAction(
          `Can't find ${invalidNotFound.friend}! Try other registered user.`,
        ),
      ),
    );
  });

  it('add already exist friend should dispatch addFriendErrorAction', () => {
    generator = sagas.addFriend(invalidExist);
    generator.next(); // call get users
    generator.next(users); // select current user
    generator.next(user); // select current friends
    const putDescriptor = generator.next(friends).value; // put addFriend error
    expect(putDescriptor).toEqual(
      put(
        actions.addFriendErrorAction(
          `You already have friend ${invalidExist.friend}`,
        ),
      ),
    );
  });

  it('add yourself should dispatch addFriendErrorAction', () => {
    generator = sagas.addFriend(invalidSelf);
    generator.next(); // call get users
    generator.next(users); // select current user
    generator.next(user); // select current friends
    const putDescriptor = generator.next(friends).value; // put addFriend error
    expect(putDescriptor).toEqual(
      put(actions.addFriendErrorAction(`You can't add yourself`)),
    );
  });

  it('network error', () => {
    generator = sagas.addFriend(validFirend);
    generator.next(); // call get users
    const error = new Error('some error');
    const putDescriptor = generator.throw(error).value; // put addFriend error
    expect(putDescriptor).toEqual(put(actions.addFriendErrorAction(error)));
  });
});

describe('unfollow friend Saga', () => {
  it('unfollow friend', () => {
    const friend = 'a friend';
    const generator = sagas.unfollowFriend(
      actions.unfollowFriendAction(friend),
    );
    const putDescriptor = generator.next().value;
    expect(putDescriptor).toEqual(
      put(actions.unfollowFriendSuccessAction(friend)),
    );
  });
});

describe('get posts Sage', () => {
  const comments = [{ postId: 1 }, { postId: 2 }, { postId: 3 }];
  const posts = [
    { id: 1, userId: 1 },
    { id: 2, userId: 2 },
    { id: 3, userId: 3 },
  ];
  let generator;
  beforeEach(() => {
    generator = sagas.getPosts();
    generator.next(); // select friends
    generator.next(friends); // select user
    generator.next(user); // call request comments
  });
  it('get post success', () => {
    generator.next(comments); // call request posts
    const putDescriptor = generator.next(posts).value; // put get posts success
    const currentPost = [];
    currentPost.push(
      Object.assign(posts[0], {
        author: {
          username: user.username,
          avatar: user.avatar,
        },
        image: IMAGES[(posts[0].id + user.id) % IMAGES.length],
        publishDate: DATES[posts[0].id % DATES.length],
        comments: [{ postId: 1 }],
      }),
    );
    currentPost.push(
      Object.assign(posts[2], {
        author: {
          username: friends[0].username,
          avatar: friends[0].avatar,
        },
        image: IMAGES[(posts[2].id + friends[0].id) % IMAGES.length],
        publishDate: DATES[posts[2].id % DATES.length],
        comments: [{ postId: 2 }],
      }),
    );
    currentPost.sort((post1, post2) => {
      if (post1.publishDate > post2.publishDate) return -1;
      if (post1.publishDate < post2.publishDate) return 1;
      return 0;
    });
    expect(putDescriptor).toEqual(
      put(actions.getPostsSuccessAction(currentPost)),
    );
  });

  it('network error', () => {
    const error = new Error('some error');
    const putDescriptor = generator.throw(error).value;
    expect(putDescriptor).toEqual(put(actions.getPostsErrorAction(error)));
  });
});

describe('add post Saga', () => {
  const post = { body: 'a post' };
  it('add post success', () => {
    const generator = sagas.addPost(actions.addPostAction(post));
    generator.next(); // select user
    const putDescriptor = generator.next(user).value;
    const posts = JSON.parse(localStorage.getItem('posts'));
    const id = posts.length + 1;
    const date = getDateFormat();
    const newPost = Object.assign(post, {
      author: { username: user.username, avatar: user.avatar },
      publishDate: date,
      id,
    });
    expect(putDescriptor).toEqual(put(actions.addPostSuccessAction(newPost)));
  });
});

describe('search posts', () => {
  it('search success', () => {
    const searchWord = 'bret';
    const generator = sagas.searchPost(actions.searchPostAction(searchWord));
    const putDescriptor = generator.next().value;
    const reg = new RegExp(searchWord, 'i');
    const posts = JSON.parse(localStorage.getItem('posts'));
    const results = posts.filter(
      post =>
        reg.test(post.title) ||
        reg.test(post.body) ||
        reg.test(post.author.username),
    );
    expect(putDescriptor).toEqual(
      put(actions.searchPostSuccessAction(results)),
    );
  });
});

describe('watch sagas', () => {
  it('watch add friend', () => {
    expect(sagas.watchAddFriend().next().value).toEqual(
      takeLatest(constants.ADD_FRIEND, sagas.addFriend),
    );
  });

  it('watchUnfollowFriend', () => {
    expect(sagas.watchUnfollowFriend().next().value).toEqual(
      takeLatest(constants.UNFOLLOW_FRIEND, sagas.unfollowFriend),
    );
  });

  it('watchGetPosts', () => {
    expect(sagas.watchGetPosts().next().value).toEqual(
      takeLatest(constants.GET_POSTS, sagas.getPosts),
    );
  });

  it('watchAddPost', () => {
    expect(sagas.watchAddPost().next().value).toEqual(
      takeLatest(constants.ADD_POST, sagas.addPost),
    );
  });

  it('watchSearchPost', () => {
    expect(sagas.watchSearchPost().next().value).toEqual(
      takeLatest(constants.SEARCH_POST, sagas.searchPost),
    );
  });

  it('watch all', () => {
    expect(homePageSaga().next().value).toEqual(
      all([
        // watchGetFriends(),
        sagas.watchAddFriend(),
        sagas.watchGetPosts(),
        sagas.watchAddPost(),
        sagas.watchSearchPost(),
        sagas.watchUnfollowFriend(),
      ]),
    );
  });
});
