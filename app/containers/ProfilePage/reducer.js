/*
 *
 * ProfilePage reducer
 *
 */
import produce from 'immer';
import { UPDATE_AVATAR } from './constants';
import defaultAvatar from '../../images/defaultAvatar.jpg';
export const initialState = {
  avatar: defaultAvatar,
};

/* eslint-disable default-case, no-param-reassign */
const profilePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_AVATAR:
        draft.avatar = action.avatar;
        break;
    }
  });

export default profilePageReducer;
