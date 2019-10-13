/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import NotFoundPage from 'containers/NotFoundPage/Loadable';

import LandingPage from 'containers/LandingPage';
import HomePage from 'containers/HomePage';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import GlobalStyle from '../../global-styles';
import reducer from './reducer';
import saga from './saga';
import * as constants from './constants';
import { makeSelectUserAuth } from './selectors';

export function App({ auth, authenticate }) {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });
  // check whether user authenticated with info in localstorage
  useEffect(() => {
    if (!auth.isAuthenticated) {
      const localAuth = localStorage.getItem('auth');
      if (localAuth) {
        // to do authenticate by using info in localstorage
        authenticate();
      }
    }
  }, [auth.isAuthenticated, authenticate]);

  window.console.log(auth.isAuthenticated);
  /* eslint-disable */
  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/landing",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
  /* eslint-enable */

  return (
    <div>
      <Switch>
        <PrivateRoute exact path="/" component={HomePage} />
        <Route exact path="/landing" component={LandingPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}

App.propTypes = {
  auth: PropTypes.object,
  authenticate: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
  auth: makeSelectUserAuth(),
});

export function mapDispatchToProps(dispatch) {
  return {
    authenticate: () => dispatch({ type: constants.AUTHENTICATE }),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(App);
