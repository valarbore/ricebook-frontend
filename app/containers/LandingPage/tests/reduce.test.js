import produce from 'immer';

import landingPageReducer, { initialState } from '../reducer';
import * as actions from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('landingPageReducer', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(landingPageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should change type', () => {
    let expectedResult = produce(state, draft => {
      draft.currentType = state.currentType === 'login' ? 'register' : 'login';
      draft.registerInfo.showHingt = false;
    });
    expect(landingPageReducer(state, actions.changeTypeAction())).toEqual(
      expectedResult,
    );
    state.currentType = 'register';
    expectedResult = produce(state, draft => {
      draft.currentType = state.currentType === 'login' ? 'register' : 'login';
      draft.registerInfo.showHingt = false;
    });
    expect(landingPageReducer(state, actions.changeTypeAction())).toEqual(
      expectedResult,
    );
  });

  it('login error', () => {
    const error = 'some error';
    const expectedResult = produce(state, draft => {
      draft.loginInfo.hasError = true;
      draft.loginInfo.errorHint = error;
    });
    expect(landingPageReducer(state, actions.loginErrorAction(error))).toEqual(
      expectedResult,
    );
  });

  it('login success', () => {
    const expectedResult = produce(state, draft => {
      draft.loginInfo.hasError = false;
      draft.loginInfo.errorHint = '';
    });
    expect(landingPageReducer(state, actions.loginSuccessAction())).toEqual(
      expectedResult,
    );
  });

  it('set login info', () => {
    const someInfo = { key: 'username', value: 'test username' };
    const expectedResult = produce(state, draft => {
      draft.loginInfo[someInfo.key].value = someInfo.value;
    });
    expect(
      landingPageReducer(
        state,
        actions.setLoginInfoAction(someInfo.key, someInfo.value),
      ),
    ).toEqual(expectedResult);
  });

  it('set register info', () => {
    const someInfo = { key: 'username', value: 'test username' };
    const expectedResult = produce(state, draft => {
      draft.registerInfo[someInfo.key].value = someInfo.value;
    });
    expect(
      landingPageReducer(
        state,
        actions.setRegisterInfoAction(someInfo.key, someInfo.value),
      ),
    ).toEqual(expectedResult);
  });

  it('set register info valid', () => {
    const someInfo = { key: 'phone', value: true };
    const expectedResult = produce(state, draft => {
      draft.registerInfo[someInfo.key].isValid = someInfo.value;
    });
    expect(
      landingPageReducer(
        state,
        actions.setRegisterInfoValidAction(someInfo.key, someInfo.value),
      ),
    ).toEqual(expectedResult);
  });

  it('register success', () => {
    const expectedResult = produce(state, draft => {
      draft.registerInfo.hasError = false;
      draft.registerInfo.showHingt = true;
      draft.registerInfo.hint = 'Register Success!';
    });
    expect(landingPageReducer(state, actions.registerSuccessAction())).toEqual(
      expectedResult,
    );
  });

  it('register error', () => {
    const errorHint = 'some error';
    const expectedResult = produce(state, draft => {
      draft.registerInfo.hasError = true;
      draft.registerInfo.showHingt = true;
      draft.registerInfo.hint = errorHint;
    });
    expect(
      landingPageReducer(state, actions.registerErrorAction(errorHint)),
    ).toEqual(expectedResult);
  });
});
