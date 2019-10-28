import produce from 'immer';

import profilePageReducer, { initialState } from '../reducer';
import * as actions from '../actions';

/* eslint-disable no-param-reassign */
describe('profilePageReducer', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });
  it('should return the initial state', () => {
    const expectedResult = state;
    expect(profilePageReducer(undefined, {})).toEqual(expectedResult);
  });
  it('update avatar', () => {
    const avatar = ' test avatar';
    const expectedResult = produce(state, draft => {
      draft.avatar = avatar;
    });
    expect(
      profilePageReducer(state, actions.updateAvatarAction(avatar)),
    ).toEqual(expectedResult);
  });
});
