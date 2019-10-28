import produce from 'immer';
import appReducer, { initialState } from '../reducer';
import * as actions from '../actions';
/* eslint-disable no-param-reassign */
describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('default', () => {
    expect(state).toEqual(appReducer(undefined, {}));
  });

  it('UPDATE_AUTH', () => {
    const testAuth = { id: 1 };
    const expectedResult = produce(state, draft => {
      draft.auth = testAuth;
    });
    expect(expectedResult).toEqual(
      appReducer(state, actions.updateAuthAction(testAuth)),
    );
  });

  it('UPDATE_USER', () => {
    const testUser = { id: 1 };
    const expectedResult = produce(state, draft => {
      draft.user = Object.assign({}, state.user, testUser);
    });
    expect(expectedResult).toEqual(
      appReducer(state, actions.updateUserAction(testUser)),
    );
  });
});
