import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the landingPage state domain
 */

const selectLandingPageDomain = state => state.landingPage || initialState;

/**
 * Other specific selectors
 */
const makeSelectLoginInfo = () =>
  createSelector(
    selectLandingPageDomain,
    substate => substate.loginInfo,
  );

const makeSelectRegisterInfo = () =>
  createSelector(
    selectLandingPageDomain,
    substate => substate.registerInfo,
  );
/**
 * Default selector used by LandingPage
 */

const makeSelectCurrentType = () =>
  createSelector(
    selectLandingPageDomain,
    substate => substate.currentType,
  );

export {
  selectLandingPageDomain,
  makeSelectCurrentType,
  makeSelectLoginInfo,
  makeSelectRegisterInfo,
};
