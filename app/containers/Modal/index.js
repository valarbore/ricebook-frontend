/**
 *
 * Modal
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import { Modal } from 'react-bootstrap';
import makeSelectModal from './selectors';
import reducer from './reducer';
import { closeAction } from './actions';
export function CustomModal({ modal, handleClose }) {
  useInjectReducer({ key: 'modal', reducer });
  return (
    <Modal show={modal.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: modal.color }}>{modal.head}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ color: modal.color }}>{modal.hint}</Modal.Body>
    </Modal>
  );
}

CustomModal.propTypes = {
  modal: PropTypes.object,
  handleClose: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  modal: makeSelectModal(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleClose: () => dispatch(closeAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CustomModal);
