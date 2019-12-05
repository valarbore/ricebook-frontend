/**
 *
 * LandingPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import LandingHeader from 'components/LandingHeader';
import { Card, Button } from 'react-bootstrap';
import {
  makeSelectCurrentType,
  makeSelectLoginInfo,
  makeSelectRegisterInfo,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Background, ContentWrapper } from './Wrapper';
import { LOGIN } from './constants';
import * as actions from './actions';
import './style.css';

import Login from './Login';
import Register from './Register';

export function LandingPage({
  currentType,
  changeType,
  loginInfo,
  setLoginInfo,
  handleLogin,
  setRegisterInfo,
  registerInfo,
  setRegisterInfoValid,
  handleRegister,
  location,
}) {
  useInjectReducer({ key: 'landingPage', reducer });
  useInjectSaga({ key: 'landingPage', saga });
  const strs = decodeURI(window.location.pathname).split('/');
  return (
    <Background>
      <Helmet>
        <title>LandingPage</title>
        <meta name="description" content="Login or Register" />
      </Helmet>
      <LandingHeader />
      <ContentWrapper>
        <Card className="card">
          {strs.length === 4 && (
            <div style={{ margin: '80px auto 0 auto' }}>
              <h3 style={{ color: 'red' }}>Login with Google Fail! </h3>
              <h3 style={{ color: 'red' }}>
                Username {strs[3]} Already Exist!
              </h3>
              <Button
                variant="link"
                onClick={() => {
                  window.location.href = '/landing';
                }}
              >
                Back to Login
              </Button>
            </div>
          )}

          {strs.length === 2 &&
            (currentType === LOGIN ? (
              <Login
                loginInfo={loginInfo}
                setLoginInfo={setLoginInfo}
                handleLogin={handleLogin}
                location={location}
              />
            ) : (
              <Register
                setRegisterInfo={setRegisterInfo}
                handleRegister={handleRegister}
                registerInfo={registerInfo}
                setRegisterInfoValid={setRegisterInfoValid}
              />
            ))}

          {strs.length === 2 && (
            <Button
              variant="link"
              className="link-button"
              id="type-change-btn"
              onClick={changeType}
            >
              {currentType === LOGIN
                ? messages.typeChangeHintRegister.defaultMessage
                : messages.typeChangeHintLogin.defaultMessage}
            </Button>
          )}
        </Card>
      </ContentWrapper>
    </Background>
  );
}

LandingPage.propTypes = {
  currentType: PropTypes.string,
  changeType: PropTypes.func,
  loginInfo: PropTypes.object,
  setLoginInfo: PropTypes.func,
  handleLogin: PropTypes.func,
  setRegisterInfo: PropTypes.func,
  registerInfo: PropTypes.object,
  setRegisterInfoValid: PropTypes.func,
  handleRegister: PropTypes.func,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  currentType: makeSelectCurrentType(),
  loginInfo: makeSelectLoginInfo(),
  registerInfo: makeSelectRegisterInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeType: () => dispatch(actions.changeTypeAction()),
    setLoginInfo: event => {
      dispatch(actions.setLoginInfoAction(event.target.id, event.target.value));
    },
    setRegisterInfo: event => {
      dispatch(
        actions.setRegisterInfoAction(event.target.id, event.target.value),
      );
    },
    setRegisterInfoValid: (key, value) => {
      dispatch(actions.setRegisterInfoValidAction(key, value));
    },
    handleLogin: (loginInfo, from) => {
      dispatch(actions.loginAction(loginInfo, from));
    },
    handleRegister: registerInfo => {
      dispatch(actions.registerAction(registerInfo));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LandingPage);
