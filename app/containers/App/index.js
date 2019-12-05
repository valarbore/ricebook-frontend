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
import ProfilePage from 'containers/ProfilePage';
import NormalHeader from 'components/NormalHeader';
import Footer from 'components/Footer';
import Error from 'containers/Error';
import GlobalStyle from '../../global-styles';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import { makeSelectUserAuth } from './selectors';

export function App({ isAuthenticated, authenticate }) {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });
  // check whether user authenticated with info in localstorage
  useEffect(() => {
    if (isAuthenticated !== true) {
      authenticate();
    }
  }, [authenticate, isAuthenticated]);
  /* eslint-disable */
  // only use logged in can they get access to private router
  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
        isAuthenticated===true ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/landing",
                state: { from: location.pathname }
              }}
            />
          )
        }
      />
    );
  }
  /* eslint-enable */
  if (isAuthenticated === null) {
    return <div className="page" id="page" />;
  }
  return (
    <div className="page" id="page">
      <NormalHeader />
      <Switch>
        <PrivateRoute exact path="/">
          <HomePage />
        </PrivateRoute>
        <PrivateRoute path="/profile/:uid">
          <ProfilePage />
        </PrivateRoute>
        <Route path="/error" component={Error} />
        <Route path="/landing/:type?/:username?" component={LandingPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
      <GlobalStyle />
    </div>
  );
}

App.propTypes = {
  isAuthenticated: PropTypes.bool,
  authenticate: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectUserAuth(),
});

export function mapDispatchToProps(dispatch) {
  return {
    authenticate: () => dispatch(actions.authenticateAction()),
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
