const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService.js');

const mockUser = {
  email: 'test@example.com',
  password: '12345',
};

describe('users routes', () => {
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

  it('it should sign in a user and allow access to profile', async () => {
    const agent = request.agent(app);
    const user = await UserService.create(mockUser);
    await agent.post('/api/v1/users/sessions').send(mockUser);
    const res = await agent.get('/api/v1/users/me');
    expect(res.body.email).toEqual(user.email);
  });
});
