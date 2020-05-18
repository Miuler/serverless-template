import { getUserInfo } from '@src/handlers/getUserInfo';

describe('get github user', () => {
  it('should ok', async () => {
    expect.hasAssertions();
    const response = await getUserInfo();
    expect(response).toBe('github');
  });
});
