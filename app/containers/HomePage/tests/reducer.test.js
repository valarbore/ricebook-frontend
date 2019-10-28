import produce from 'immer';

import { friends } from 'mock/friend';
import homePageReducer, { initialState } from '../reducer';
import * as actions from '../actions';

/* eslint-disable no-param-reassign */
describe('homePageReducer', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('default ', () => {
    expect(state).toEqual(homePageReducer(undefined, {}));
  });
  it('GET_FRIENDS_SUCCESS', () => {
    const expectedResult = produce(state, draft => {
      draft.friends = friends;
    });
    expect(expectedResult).toEqual(
      homePageReducer(state, actions.getFriendsSuccessAction(friends)),
    );
  });

  it('ADD_FRIEND_SUCCESS', () => {
    const testFriend = { id: 1 };
    const expectedResult = produce(state, draft => {
      draft.friends.push(testFriend);
    });
    expect(expectedResult).toEqual(
      homePageReducer(state, actions.addFriendSuccessAction(testFriend)),
    );
  });

  it('ADD_FRIEND_ERROR', () => {
    const testError = 'some error';
    const expectedResult = produce(state, draft => {
      draft.errors.addFriendErrorFlag = !state.errors.addFriendErrorFlag;
      draft.errors.addFriendErrorHint = testError;
    });
    expect(expectedResult).toEqual(
      homePageReducer(state, actions.addFriendErrorAction(testError)),
    );
  });

  it('UNFOLLOW_FRIEND_SUCCESS', () => {
    const testFriend = { id: 1 };
    let expectedResult = produce(state, draft => {
      draft.friends = state.friends.filter(
        friend => friend.id !== testFriend.id,
      );
    });
    expect(expectedResult).toEqual(
      homePageReducer(state, actions.unfollowFriendSuccessAction(testFriend)),
    );
    state.friends = [{ id: 1 }];
    expectedResult = produce(state, draft => {
      draft.friends = state.friends.filter(
        friend => friend.id !== testFriend.id,
      );
    });
    expect(expectedResult).toEqual(
      homePageReducer(state, actions.unfollowFriendSuccessAction(testFriend)),
    );
  });

  it('GET_POSTS_SUCCESS', () => {
    const testPosts = [{ id: 1 }];
    const expectedResult = produce(state, draft => {
      draft.posts = testPosts;
    });
    expect(expectedResult).toEqual(
      homePageReducer(state, actions.getPostsSuccessAction(testPosts)),
    );
  });

  it('ADD_POST_SUCCESS', () => {
    const testPost = { id: 1 };
    const expectedResult = produce(state, draft => {
      draft.posts.unshift(testPost);
    });
    expect(expectedResult).toEqual(
      homePageReducer(state, actions.addPostSuccessAction(testPost)),
    );
  });

  it('SEARCH_POST_SUCCESS', () => {
    const testPosts = [{ id: 1 }];
    const expectedResult = produce(state, draft => {
      draft.posts = testPosts;
    });
    expect(expectedResult).toEqual(
      homePageReducer(state, actions.searchPostSuccessAction(testPosts)),
    );
  });
});
