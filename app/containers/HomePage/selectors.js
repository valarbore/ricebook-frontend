import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homePage state domain
 */

const selectHomePageDomain = state => state.homePage || initialState;

/**
 * Other specific selectors
 */
export const makeSelectFriends = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.friends,
  );
export const makeSelectError = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.errors,
  );

export const makeSelectPosts = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.posts,
  );
/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate,
  );

export default makeSelectHomePage;
