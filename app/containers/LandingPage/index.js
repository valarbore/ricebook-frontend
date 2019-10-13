/**
 *
 * LandingPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import LandingHeader from 'components/LandingHeader';
import LoginForm from 'components/LoginForm';
import RegisterForm from 'components/RegisterForm';
import { makeSelectCurrentType } from './selectors';
import { changeType } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function LandingPage({ currentType, changeType }) {
  useInjectReducer({ key: 'landingPage', reducer });
  useInjectSaga({ key: 'landingPage', saga });
  window.console.log(currentType);
  return (
    <div>
      <Helmet>
        <title>LandingPage</title>
        <meta name="description" content="Description of LandingPage" />
      </Helmet>
      <LandingHeader />
      <FormattedMessage {...messages.header} />
      {currentType === 'login' ? <LoginForm /> : <RegisterForm />}
      <button type="button" onClick={changeType}>
        {currentType}
      </button>
    </div>
  );
}

LandingPage.propTypes = {
  currentType: PropTypes.string,
  changeType: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  currentType: makeSelectCurrentType(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeType: () => dispatch(changeType()),
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
