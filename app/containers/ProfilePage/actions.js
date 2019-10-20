/*
 *
 * ProfilePage actions
 *
 */

import { UPDATE_AVATAR } from './constants';

export function updateAvatar(avatar) {
  return {
    type: UPDATE_AVATAR,
    avatar,
  };
}
