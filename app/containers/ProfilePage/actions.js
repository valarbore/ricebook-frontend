/*
 *
 * ProfilePage actions
 *
 */

import * as constants from './constants';

export function updateAvatarAction(avatar) {
  return {
    type: constants.UPDATE_AVATAR,
    avatar,
  };
}

export function updateAvatarSuccessAction(avatar) {
  return {
    type: constants.UPDATE_AVATAR_SUCCESS,
    avatar,
  };
}

export function updateAvatarErrorAction(err) {
  return {
    type: constants.UPDATE_AVATAR_ERROR,
    err,
  };
}

export function updateInfoChangeAction(data) {
  return {
    type: constants.UPDATE_INFO_CHANGE,
    data,
  };
}

export function updateProfileAction(data) {
  return {
    type: constants.UPDATE_PROFILE,
    data,
  };
}

export function updateProfileSuccessAction(data) {
  return {
    type: constants.UPDATE_PROFILE_SUCCESS,
    data,
  };
}

export function updateProfileErrorAction(err) {
  return {
    type: constants.UPDATE_AVATAR_ERROR,
    err,
  };
}
