import * as dateUtils from '../date';
describe('date transform', () => {
  it('yyyy-mm-dd', () => {
    const date = new Date();
    const expectedResult = `${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()}`;
    expect(dateUtils.getDateFormat()).toEqual(expectedResult);
  });
});
