/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const UPDATE_AUTH = 'App/UPDATE_AUTH';
export const UPDATE_USER = 'App/UPDATE_USER';
export const AUTHENTICATE = 'App/AUTHENTICATE';
export const LOG_OUT = 'App/LOG_OUT';
export const UNKNOW_ERROR = 'Something wrong! Please try later!';
