/*
 *
 * Modal reducer
 *
 */
import produce from 'immer';
import * as constants from './constants';

export const initialState = {
  hint: '',
  head: '',
  color: '',
  show: false,
};

/* eslint-disable default-case, no-param-reassign */
const modalReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.CLOSE_MODAL:
        draft.show = false;
        break;
      case constants.SHOW_ERROR_MODAL:
        draft.show = true;
        draft.color = 'red';
        draft.hint = action.data;
        draft.head = 'Error!';
        break;
      case constants.SHOW_SUCCESS_MODAL:
        draft.show = true;
        draft.color = 'green';
        draft.hint = action.data;
        draft.head = 'Success!';
        break;
      case constants.SHOW_NORMAL_MODAL:
        draft.show = true;
        draft.color = '';
        draft.hint = action.data;
        draft.head = 'Hint!';
        break;
      case constants.DEFAULT_ACTION:
        break;
    }
  });

export default modalReducer;
