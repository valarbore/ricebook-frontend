/**
 *
 * LandingHeader
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const Wrapper = styled.div`
  height: 82px;
  min-width: 980px;
  background-color: #3578e5;
  text-align: center;
`;

const H1 = styled.h1`
  line-height: 82px;
  color: white;
`;

function LandingHeader() {
  return (
    <Wrapper>
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
    </Wrapper>
  );
}

LandingHeader.propTypes = {};

export default memo(LandingHeader);
