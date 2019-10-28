/**
 * Tests for LandingPage sagas
 */

import { put, takeLatest, all } from 'redux-saga/effects';

import { push } from 'connected-react-router';
import * as constants from '../constants';
import * as actions from '../actions';
import messages from '../messages';
import landingPageSaga, {
  handleLogin,
  handleRegister,
  watchHandleLogin,
  watchHandleRegister,
} from '../saga';
const users = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496',
      },
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets',
    },
  },
];
/* eslint-disable redux-saga/yield-effects */
describe('handleLogin Saga', () => {
  const validUserInfo = {
    username: { value: 'Bret' },
    password: { value: 'Kulas Light' },
  };
  const invalidUserInfo = {
    username: { value: 'BB' },
    password: { value: 'Kulas Light' },
  };
  let handleLoginGenerator;
  beforeEach(() => {
    handleLoginGenerator = handleLogin();
    handleLoginGenerator.next(); // selctor loginInfo});
  });
  it('should dispatch the loginSuccessAction action if username and password match the registed users', () => {
    handleLoginGenerator.next(validUserInfo); // call get users
    handleLoginGenerator.next(users); // put update auth
    handleLoginGenerator.next(); // put update user
    let putDescriptor = handleLoginGenerator.next().value; // put login success
    expect(putDescriptor).toEqual(put(actions.loginSuccessAction()));
    putDescriptor = handleLoginGenerator.next().value;
    expect(putDescriptor).toEqual(put(push('/')));
  });
  it('should dispatch the loginErrorAction action if username and password do not match the registed users', () => {
    handleLoginGenerator.next(invalidUserInfo); // call get users
    const putDescriptor = handleLoginGenerator.next(users).value; // put login error
    expect(putDescriptor).toEqual(
      put(actions.loginErrorAction(messages.loginErrorHint.defaultMessage)),
    );
  });
  it('should dispatch the loginErrorAction action if network error', () => {
    handleLoginGenerator.next(invalidUserInfo); // call get users
    const error = new Error('Some error');
    const putDescriptor = handleLoginGenerator.throw(error).value; // put login error
    expect(putDescriptor).toEqual(put(actions.loginErrorAction(error)));
  });
});

describe('handleRegister Saga', () => {
  const validUserInfo = {
    username: { value: 'BB' },
  };
  const invalidUserInfo = {
    username: { value: 'Bret' },
  };
  let generator;
  beforeEach(() => {
    generator = handleRegister();
    generator.next(); // selctor loginInfo
  });
  it('should dispatch the registerSuccessAction action if username do not exist', () => {
    generator.next(validUserInfo); // call get users
    const putDescriptor = generator.next(users).value; // put register success
    expect(putDescriptor).toEqual(put(actions.registerSuccessAction()));
  });
  it('should dispatch the registerErrorAction action if username already exist', () => {
    generator.next(invalidUserInfo); // call get users
    const putDescriptor = generator.next(users).value; // put login error
    expect(putDescriptor).toEqual(
      put(
        actions.registerErrorAction(
          messages.registerErrorUserexistHint.defaultMessage,
        ),
      ),
    );
  });
  it('should dispatch the registerErrorAction action if network error', () => {
    generator.next(validUserInfo); // call get users
    const error = new Error('Some error');
    const putDescriptor = generator.throw(error).value; // put register error
    expect(putDescriptor).toEqual(put(actions.registerErrorAction(error)));
  });
});

describe('watchHandleLogin Saga', () => {
  const generator = watchHandleLogin();

  it('should start task to watch for HANDLE_LOGIN action', () => {
    const takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(constants.HANDLE_LOGIN, handleLogin),
    );
  });
});

describe('watchHandleRegister Saga', () => {
  const generator = watchHandleRegister();
  it('should start task to watch for HANDLE_LOGIN action', () => {
    const takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(constants.HANDLE_REGISTER, handleRegister),
    );
  });
});

describe('landingPageSaga Saga', () => {
  const generator = landingPageSaga();
  it('should start watch function ', () => {
    const allDescriptor = generator.next().value;
    expect(allDescriptor).toEqual(
      all([watchHandleLogin(), watchHandleRegister()]),
    );
  });
});
