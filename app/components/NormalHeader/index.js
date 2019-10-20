/**
 *
 * NormalHeader
 *
 */

import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import brandImage from '../../images/icon.png';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function NormalHeader() {
  return (
    <Navbar style={{ backgroundColor: '#3578e5', height: '56px' }}>
      <Link
        style={{
          color: 'white',
          width: '1024px',
          margin: '0 auto',
          textDecoration: 'none',
        }}
        to="/"
      >
        <img
          alt=""
          src={brandImage}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        Folkszone
      </Link>
    </Navbar>
  );
}

NormalHeader.propTypes = {};

export default NormalHeader;
