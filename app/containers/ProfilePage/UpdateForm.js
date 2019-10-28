import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { validatePhone, validateZipcode } from '../../utils/validates';
export default function UpdateForm({ user, updateUser }) {
  UpdateForm.propTypes = {
    user: PropTypes.object,
    updateUser: PropTypes.func,
  };
  const initialUserInfo = {
    username: '',
    email: '',
    phone: '',
    isPhoneValid: true,
    zipcode: '',
    isZipcodeValid: true,
    password: '',
  };
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const handleChange = change => {
    setUserInfo(Object.assign({}, { ...userInfo }, change));
  };
  const handleUpdate = event => {
    const phoneValid = userInfo.phone === '' || validatePhone(userInfo.phone);
    const zipcodeValid =
      userInfo.zipcode === '' || validateZipcode(userInfo.zipcode);
    setUserInfo(
      Object.assign(
        {},
        { ...userInfo },
        {
          isPhoneValid: phoneValid,
          isZipcodeValid: zipcodeValid,
        },
      ),
    );
    if (phoneValid && zipcodeValid) {
      const updateInfo = {
        username: userInfo.username !== '' ? userInfo.username : user.username,
        email: userInfo.email !== '' ? userInfo.email : user.email,
        phone: userInfo.phone !== '' ? userInfo.phone : user.phone,
        address: {
          zipcode:
            userInfo.zipcode !== '' ? userInfo.zipcode : user.address.zipcode,
          street:
            userInfo.password !== '' ? userInfo.password : user.address.street,
        },
      };
      updateUser(updateInfo);
      setUserInfo(initialUserInfo);
    }
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <div style={{ padding: '0 30px', marginTop: '40px' }}>
      <h3>Update Info</h3>
      <Form style={{ padding: '20px' }} onSubmit={handleUpdate}>
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            Username:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              placeholder="new username"
              value={userInfo.username}
              onChange={event => {
                handleChange({
                  username: event.target.value,
                });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            Email:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="email"
              placeholder="new emial"
              value={userInfo.email}
              onChange={event => {
                handleChange({
                  email: event.target.value,
                });
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            Phone:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              placeholder="new phone"
              value={userInfo.phone}
              onChange={event => {
                handleChange({
                  phone: event.target.value,
                });
              }}
            />
            {!userInfo.isPhoneValid && (
              <Form.Text className="profile-page-error-hint">
                Please provide a valid phone.(xxx-xxx-xxxx)
              </Form.Text>
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            Zip Code:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              placeholder="new zipcode"
              value={userInfo.zipcode}
              onChange={event => {
                handleChange({
                  zipcode: event.target.value,
                });
              }}
            />
            {!userInfo.isZipcodeValid && (
              <Form.Text className="profile-page-error-hint">
                Please provide a valid zipcode.(xxxxx)
              </Form.Text>
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            Password:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="password"
              placeholder="new password"
              value={userInfo.password}
              onChange={event => {
                handleChange({
                  password: event.target.value,
                });
              }}
            />
          </Col>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          style={{
            width: '500px',
            margin: '40px auto 0 auto',
            display: 'block',
          }}
        >
          Update
        </Button>
      </Form>
    </div>
  );
}
