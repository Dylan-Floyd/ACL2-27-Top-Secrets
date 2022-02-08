const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

/*
const mockUser = {
  email: 'test@example.com',
  password: '12345',
};
*/

describe('secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('unauthenticated users can\'t access secrets', async () => {
    const res = request(app).get('/api/v1/secrets');
    expect(res.status).toEqual(401);
  });
});
