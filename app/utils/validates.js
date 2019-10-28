export const validateZipcode = zipcode => zipcode.match('^[0-9]{5}$') !== null;
export const validatePassword = (newPass, oldPass) => newPass === oldPass;
export const validatePhone = phone =>
  phone.match('^[0-9]{3}-[0-9]{3}-[0-9]{4}$') !== null ||
  phone.match('^[0-9]{10}$') != null;
