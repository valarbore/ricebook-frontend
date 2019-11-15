import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import messages from './messages';
export default function Register({
  setRegisterInfo,
  registerInfo,
  setRegisterInfoValid,
  handleRegister,
}) {
  Register.propTypes = {
    registerInfo: PropTypes.object,
    setRegisterInfo: PropTypes.func,
    setRegisterInfoValid: PropTypes.func,
    handleRegister: PropTypes.func,
  };
  // validate register info and handle register
  const handleRegisterSubmit = event => {
    // check password equal
    const passwordIsValid =
      registerInfo.password === registerInfo.passwordConfirm;
    setRegisterInfoValid('passwordError', !passwordIsValid);
    if (passwordIsValid) {
      handleRegister(registerInfo);
    }
    event.preventDefault();
  };
  return (
    <Form id="register-form" onSubmit={handleRegisterSubmit}>
      <Form.Group as={Row}>
        <Form.Label column sm={4}>
          {messages.usernameLabel.defaultMessage}
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            id="username"
            onChange={setRegisterInfo}
            type="text"
            pattern="[A-Za-z]+[A-Za-z0-9]*"
            title="Account name can only be upper or lower case letters and numbers, but may not start with a number"
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
            placeholder={messages.passwordConfirmPlaceholder.defaultMessage}
            required
          />
          {registerInfo.passwordError && (
            <Form.Text className="error-hint">
              Please confirm two passwords are same
            </Form.Text>
          )}
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={4}>
          Date of Birth:
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            id="dob"
            onChange={setRegisterInfo}
            type="text"
            pattern="^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$"
            title="Please enter an valid date yyyy-mm-dd"
            placeholder="yyyy-mm-dd"
            required
          />
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
            pattern="\d{5}"
            title="Zipcode should be exactly 5 digits."
            placeholder={messages.zipcodePlaceholder.defaultMessage}
            required
          />
        </Col>
      </Form.Group>
      {registerInfo.showHingt && (
        <p
          data-testid="register-hint"
          style={{
            textAlign: 'center',
            color: registerInfo.hasError ? 'red' : 'green',
          }}
        >
          {registerInfo.hint}
        </p>
      )}
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
  );
}
