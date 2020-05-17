import { getUserInfo } from '../src/handlers/getUserInfo';

describe('get github user', () => {
  it('should ok', () => {
    expect.hasAssertions();
    expect(getUserInfo()).toBe('');
  });
});
