/*
 *
 * ProfilePage reducer
 *
 */
import produce from 'immer';
import {
  UPDATE_AVATAR,
  UPDATE_INFO_CHANGE,
  UPDATE_PROFILE_SUCCESS,
  EMAIL,
  ZIPCODE,
  PASSWORD,
} from './constants';
import defaultAvatar from '../../images/defaultAvatar.jpg';
export const initialState = {
  avatar: defaultAvatar,
  updateInfo: {
    email: '',
    zipcode: '',
    password: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const profilePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_AVATAR:
        draft.avatar = action.avatar;
        break;
      case UPDATE_INFO_CHANGE:
        draft.updateInfo = Object.assign({}, state.updateInfo, action.data);
        break;
      case UPDATE_PROFILE_SUCCESS:
        if (action.data.type === EMAIL) draft.updateInfo.email = '';
        else if (action.data.type === ZIPCODE) draft.updateInfo.zipcode = '';
        else if (action.data.type === PASSWORD) draft.updateInfo.password = '';
        break;
    }
  });

export default profilePageReducer;
