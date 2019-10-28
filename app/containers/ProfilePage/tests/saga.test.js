import profilePageSaga from '../saga';
describe('profilePageSaga', () => {
  it('start watch', () => {
    const generaotr = profilePageSaga();
    const decriptor = generaotr.next().done;
    expect(decriptor).toEqual(true);
  });
});
