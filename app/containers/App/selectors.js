import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const makeSelectUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.user,
  );

const makeSelectUserAuth = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.auth,
  );

export { makeSelectUserAuth, makeSelectUser };
