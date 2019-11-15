import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const makeSelectUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.profile,
  );

const makeSelectUserAuth = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.isAuthenticated,
  );

export { makeSelectUserAuth, makeSelectUser };
