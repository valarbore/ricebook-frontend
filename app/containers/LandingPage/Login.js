import React from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import messages from './messages';

export default function Login({
  loginInfo,
  handleLogin,
  setLoginInfo,
  location,
}) {
  Login.propTypes = {
    loginInfo: PropTypes.object,
    handleLogin: PropTypes.func,
    setLoginInfo: PropTypes.func,
    location: PropTypes.object,
  };
  // redirect to the path user want to go
  let from = '/';
  if (location.state !== undefined) {
    if (location.state.from !== undefined) {
      // eslint-disable-next-line prefer-destructuring
      from = location.state.from;
    }
  }
  return (
    <Form
      id="signin-form"
      style={{
        margin: ' 80px 30px 0px 30px',
      }}
      onSubmit={event => {
        handleLogin(loginInfo, from);
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <Form.Group style={{ marginBottom: '50px' }}>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          id="username"
          name="login-username"
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
          name="login-password"
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
        name="login-btn"
        style={{
          width: '200px',
          margin: '50px auto 0 auto',
          display: 'block',
        }}
      >
        {messages.signIn.defaultMessage}
      </Button>
    </Form>
  );
}
