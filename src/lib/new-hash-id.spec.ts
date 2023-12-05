import { newHashId } from './new-hash-id';

describe('newHashId', () => {
  it('should create a new hash id', () => {
    const id = newHashId();
    expect(id).toBeTruthy();
  });
});
