export const validateZipcode = zipcode => zipcode.match('^[0-9]{5}$');
export const validatePassword = (newPass, oldPass) => newPass === oldPass;
export const validatePhone = phone =>
  phone.match('^[0-9]{3}-[0-9]{3}-[0-9]{4}$') || phone.match('^[0-9]{10}$');
