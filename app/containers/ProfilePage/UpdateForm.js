import React from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { EMAIL, ZIPCODE, PASSWORD } from './constants';

export default function UpdateForm({
  updateInfo,
  updateProfile,
  updateInfoChange,
}) {
  UpdateForm.propTypes = {
    updateInfo: PropTypes.object,
    updateProfile: PropTypes.func,
    updateInfoChange: PropTypes.func,
  };
  const handleUpdate = (event, type) => {
    switch (type) {
      case EMAIL:
        updateProfile({ type: EMAIL, data: updateInfo.email });
        break;
      case ZIPCODE:
        updateProfile({ type: ZIPCODE, data: updateInfo.zipcode });
        break;
      case PASSWORD:
        updateProfile({ type: PASSWORD, data: updateInfo.password });
        break;
      default:
        break;
    }
    event.preventDefault();
  };
  return (
    <div style={{ padding: '0 30px', marginTop: '40px' }}>
      <h3>Update Info</h3>
      <div style={{ padding: '20px' }}>
        <Form onSubmit={event => handleUpdate(event, EMAIL)}>
          <Form.Group as={Row}>
            <Form.Label column sm={3}>
              Email:
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                type="email"
                placeholder="new email"
                value={updateInfo.email}
                required
                onChange={event => {
                  updateInfoChange({
                    email: event.target.value,
                  });
                }}
              />
            </Col>
            <Col sm={2}>
              <Button size="sm" type="submit">
                Update
              </Button>
            </Col>
          </Form.Group>
        </Form>
        <Form onSubmit={event => handleUpdate(event, ZIPCODE)}>
          <Form.Group as={Row}>
            <Form.Label column sm={3}>
              Zip Code:
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                type="text"
                placeholder="new zipcode"
                pattern="\d{5}"
                title="Zipcode should be exactly 5 digits."
                value={updateInfo.zipcode}
                required
                onChange={event => {
                  updateInfoChange({
                    zipcode: event.target.value,
                  });
                }}
              />
            </Col>
            <Col sm={2}>
              <Button size="sm" type="submit">
                Update
              </Button>
            </Col>
          </Form.Group>
        </Form>
        <Form onSubmit={event => handleUpdate(event, PASSWORD)}>
          <Form.Group as={Row}>
            <Form.Label column sm={3}>
              Password:
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                type="password"
                required
                placeholder="new password"
                value={updateInfo.password}
                onChange={event => {
                  updateInfoChange({
                    password: event.target.value,
                  });
                }}
              />
            </Col>
            <Col sm={2}>
              <Button size="sm" type="submit">
                Update
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
