/*
 *
 * LandingPage reducer
 *
 */
import produce from 'immer';
import { CHANGE_TYPE } from './constants';

export const initialState = {
  currentType: 'login',
};

/* eslint-disable default-case, no-param-reassign */
const landingPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_TYPE:
        draft.currentType =
          state.currentType === 'login' ? 'register' : 'login';
        break;
    }
  });

export default landingPageReducer;
