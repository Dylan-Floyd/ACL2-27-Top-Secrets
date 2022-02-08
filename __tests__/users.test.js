const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const mockUser = {
  email: 'test@example.com',
  password: '12345',
};

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('can sign up a user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);

    expect(res.body).toEqual({
      id: expect.any(String),
      email: mockUser.email,
    });
  });
});
