/*
 * LandingPage Messages
 *
 * This contains all the text for the LandingPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LandingPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the LandingPage container!',
  },
  usernamePlaceholder: {
    id: `${scope}.usernamePlaceholder`,
    defaultMessage: 'Please enter your username',
  },
  usernameLabel: {
    id: `${scope}.usernameLabel`,
    defaultMessage: 'Username: ',
  },
  passwordPlaceholder: {
    id: `${scope}.usernamePlaceholder`,
    defaultMessage: 'Please enter your password',
  },
  passwordLabel: {
    id: `${scope}.usernameLabel`,
    defaultMessage: 'Password: ',
  },
  signIn: {
    id: `${scope}.signIn`,
    defaultMessage: 'Sign in',
  },
  register: {
    id: `${scope}.register`,
    defaultMessage: 'Register',
  },
  typeChangeHintLogin: {
    id: `${scope}.typeChangeHintLogin`,
    defaultMessage: 'Already has an account?',
  },
  typeChangeHintRegister: {
    id: `${scope}.typeChangeHintRegister`,
    defaultMessage: 'Create a new account!',
  },
  emailLabel: {
    id: `${scope}.emailLabel`,
    defaultMessage: 'Email: ',
  },
  emailPlaceholder: {
    id: `${scope}.emailPlaceholder`,
    defaultMessage: 'Please enter your email',
  },
  passwordConfirmLabel: {
    id: `${scope}.passwordConfirmLabel`,
    defaultMessage: 'Password Confirm: ',
  },
  passwordConfirmPlaceholder: {
    id: `${scope}.passwordConfirmLabel`,
    defaultMessage: 'Please enter password confirm ',
  },
  phoneLabel: {
    id: `${scope}.phoneLabel`,
    defaultMessage: 'Phone: ',
  },
  phonePlaceholer: {
    id: `${scope}.phonePlaceholer`,
    defaultMessage: 'Please enter your phone ',
  },
  zipcodeLabel: {
    id: `${scope}.zipcodeLabel`,
    defaultMessage: 'Zip Code: ',
  },
  zipcodePlaceholder: {
    id: `${scope}.zipcodePlaceholder`,
    defaultMessage: 'Please enter your zip zode ',
  },
  loginErrorHint: {
    id: `${scope}.loginErrorHint`,
    defaultMessage:
      'Username or Password wrong! Try username: Bret password: Kulas Light',
  },
  registerErrorUserexistHint: {
    id: `${scope}.registerErrorUserexistHint`,
    defaultMessage: 'Register fail! Username already exists!',
  },
});
