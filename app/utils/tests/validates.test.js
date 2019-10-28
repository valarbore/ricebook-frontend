import * as validates from '../validates';
describe('validate', () => {
  it('validate zipcode', () => {
    const validZipcode = '77005';
    const invalidZipcode = '123';
    expect(validates.validateZipcode(validZipcode)).toEqual(true);
    expect(validates.validateZipcode(invalidZipcode)).toEqual(false);
  });

  it('validate phone', () => {
    const validPhone = '8328711761';
    const invalidPhone = '12345';
    expect(validates.validatePhone(validPhone)).toEqual(true);
    expect(validates.validatePhone(invalidPhone)).toEqual(false);
  });

  it('validate password', () => {
    const password = '123';
    const confirmPassword = '123';
    const invalidConfirmPassword = '1234';
    expect(validates.validatePassword(password, confirmPassword)).toEqual(true);
    expect(
      validates.validatePassword(password, invalidConfirmPassword),
    ).toEqual(false);
  });
});
