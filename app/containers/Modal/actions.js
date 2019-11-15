/*
 *
 * Modal actions
 *
 */

import * as constants from './constants';

export function defaultAction() {
  return {
    type: constants.DEFAULT_ACTION,
  };
}

export function closeAction() {
  return {
    type: constants.CLOSE_MODAL,
  };
}

export function showErrorAction(data) {
  return {
    type: constants.SHOW_ERROR_MODAL,
    data,
  };
}

export function showSuceessAction(data) {
  return {
    type: constants.SHOW_SUCCESS_MODAL,
    data,
  };
}
export function showNormalAction(data) {
  return {
    type: constants.SHOW_NORMAL_MODAL,
    data,
  };
}
