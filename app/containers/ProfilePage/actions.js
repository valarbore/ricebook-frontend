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
