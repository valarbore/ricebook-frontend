import { put, takeLatest, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import rootSage, * as sagas from '../saga';
import * as actions from '../actions';
import * as contants from '../constants';

describe('authenticate', () => {
  it('authenticate', () => {
    const testAuth = '{"token":1,"id":1,"username":"Bret"}';
    const generator = sagas.authenticate(actions.authenticateAction(testAuth));
    const user = JSON.parse(localStorage.getItem('user'));
    expect(generator.next().value).toEqual(
      put(
        actions.updateAuthAction({
          token: 1,
          id: 1,
          isAuthenticated: true,
        }),
      ),
    );
    expect(generator.next().value).toEqual(put(actions.updateUserAction(user)));
  });

  it('watchAuthenticate', () => {
    expect(sagas.watchAuthenticate().next().value).toEqual(
      takeLatest(contants.AUTHENTICATE, sagas.authenticate),
    );
  });
});

describe('logout', () => {
  it('logout', () => {
    expect(sagas.logout().next().value).toEqual(put(push('/landing')));
  });

  it('watchLogout', () => {
    expect(sagas.watchLogout().next().value).toEqual(
      takeLatest(contants.LOG_OUT, sagas.logout),
    );
  });
});

describe('rootSage', () => {
  it('rootSage', () => {
    expect(rootSage().next().value).toEqual(
      all([sagas.watchAuthenticate(), sagas.watchLogout()]),
    );
  });
});
