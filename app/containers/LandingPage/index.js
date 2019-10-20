/**
 *
 * LandingPage
 *
 */

import React, { memo, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import LandingHeader from 'components/LandingHeader';

import { Form, Card, Button, Row, Col } from 'react-bootstrap';
import {
  makeSelectCurrentType,
  makeSelectLoginInfo,
  makeSelectRegisterInfo,
} from './selectors';
import {
  changeTypeAction,
  setLoginInfoAction,
  setRegisterInfoAction,
  setRegisterInfoValidAction,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Background, ContentWrapper } from './Wrapper';
import { LOGIN, HANDLE_LOGIN, HANDLE_REGISTER } from './constants';
import './style.css';
import {
  validatePassword,
  validatePhone,
  validateZipcode,
} from '../../utils/validates';
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
}) {
  useInjectReducer({ key: 'landingPage', reducer });
  useInjectSaga({ key: 'landingPage', saga });
  window.console.log(currentType);
  // validate register info and handle register
  const handleRegisterSubmit = event => {
    const passwordIsValid = validatePassword(
      registerInfo.password.value,
      registerInfo.passwordConfirm.value,
    );
    const phoneIsValid = validatePhone(registerInfo.phone.value);
    const zipcodeIsValid = validateZipcode(registerInfo.zipcode.value);
    setRegisterInfoValid('passwordConfirm', passwordIsValid);
    setRegisterInfoValid('phone', phoneIsValid);
    setRegisterInfoValid('zipcode', zipcodeIsValid);

    if (passwordIsValid && phoneIsValid && zipcodeIsValid) {
      // handle register

      handleRegister(registerInfo);
    }
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Background>
      <Helmet>
        <title>LandingPage</title>
        <meta name="description" content="Login or Register" />
      </Helmet>
      <LandingHeader />
      <ContentWrapper>
        <Card className="card">
          {currentType === LOGIN ? (
            <Form
              style={{
                margin: ' 80px 30px 0px 30px',
              }}
              onSubmit={event => {
                handleLogin(loginInfo);
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              <Form.Group style={{ marginBottom: '50px' }}>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  id="username"
                  placeholder={messages.usernamePlaceholder.defaultMessage}
                  onChange={setLoginInfo}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>{messages.passwordLabel.defaultMessage}</Form.Label>
                <Form.Control
                  id="password"
                  type="password"
                  placeholder={messages.passwordPlaceholder.defaultMessage}
                  onChange={setLoginInfo}
                  required
                />
                {loginInfo.hasError && (
                  <Form.Text style={{ color: 'red', marginTop: '20px' }}>
                    {loginInfo.errorHint}
                  </Form.Text>
                )}
              </Form.Group>
              <Button
                type="submit"
                size="bg"
                style={{
                  width: '200px',
                  margin: '50px auto 0 auto',
                  display: 'block',
                }}
              >
                {messages.signIn.defaultMessage}
              </Button>
            </Form>
          ) : (
            <Form onSubmit={handleRegisterSubmit}>
              <Form.Group as={Row}>
                <Form.Label column sm={4}>
                  {messages.usernameLabel.defaultMessage}
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    id="username"
                    onChange={setRegisterInfo}
                    type="text"
                    placeholder={messages.usernamePlaceholder.defaultMessage}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={4}>
                  {messages.emailLabel.defaultMessage}
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    id="email"
                    onChange={setRegisterInfo}
                    type="email"
                    placeholder={messages.emailPlaceholder.defaultMessage}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={4}>
                  {messages.passwordLabel.defaultMessage}
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    id="password"
                    onChange={setRegisterInfo}
                    type="password"
                    placeholder={messages.passwordPlaceholder.defaultMessage}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={4}>
                  {messages.passwordConfirmLabel.defaultMessage}
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    id="passwordConfirm"
                    onChange={setRegisterInfo}
                    type="password"
                    placeholder={
                      messages.passwordConfirmPlaceholder.defaultMessage
                    }
                    required
                  />
                  {!registerInfo.passwordConfirm.isValid && (
                    <Form.Text className="error-hint">
                      Please confirm two passwords are same
                    </Form.Text>
                  )}
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={4}>
                  {messages.phoneLabel.defaultMessage}
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    id="phone"
                    onChange={setRegisterInfo}
                    type="text"
                    placeholder={messages.phonePlaceholer.defaultMessage}
                    required
                  />
                  {!registerInfo.phone.isValid && (
                    <Form.Text className="error-hint">
                      Please provide a valid phone.(xxx-xxx-xxxx)
                    </Form.Text>
                  )}
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={4}>
                  {messages.zipcodeLabel.defaultMessage}
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    id="zipcode"
                    onChange={setRegisterInfo}
                    type="text"
                    placeholder={messages.zipcodePlaceholder.defaultMessage}
                    required
                  />
                  {!registerInfo.zipcode.isValid && (
                    <Form.Text className="error-hint">
                      Please provide a valid zipcode.(xxxxx)
                    </Form.Text>
                  )}
                </Col>
              </Form.Group>
              <Button
                type="submit"
                size="bg"
                style={{
                  width: '200px',
                  margin: '50px auto 0 auto',
                  display: 'block',
                }}
              >
                {messages.register.defaultMessage}
              </Button>
            </Form>
          )}

          <Button variant="link" className="link-button" onClick={changeType}>
            {currentType === LOGIN
              ? messages.typeChangeHintRegister.defaultMessage
              : messages.typeChangeHintLogin.defaultMessage}
          </Button>
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
};

const mapStateToProps = createStructuredSelector({
  currentType: makeSelectCurrentType(),
  loginInfo: makeSelectLoginInfo(),
  registerInfo: makeSelectRegisterInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeType: () => dispatch(changeTypeAction()),
    setLoginInfo: event => {
      dispatch(setLoginInfoAction(event.target.id, event.target.value));
    },
    setRegisterInfo: event => {
      dispatch(setRegisterInfoAction(event.target.id, event.target.value));
    },
    setRegisterInfoValid: (key, value) => {
      dispatch(setRegisterInfoValidAction(key, value));
    },
    handleLogin: loginInfo => {
      dispatch({ type: HANDLE_LOGIN, loginInfo });
    },
    handleRegister: registerInfo => {
      dispatch({ type: HANDLE_REGISTER, registerInfo });
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
