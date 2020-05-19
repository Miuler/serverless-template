import { getUserGithub } from '@src/handlers/getUserGithub';

describe('get github user', () => {
  it('should ok', async () => {
    expect.hasAssertions();
    const response = await getUserGithub();
    expect(response).toBe('github');
  });
});
