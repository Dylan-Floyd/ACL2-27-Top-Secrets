const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService.js');

const mockUser = {
  email: 'test@example.com',
  password: '12345',
};

const mockSecret = {
  title: 'Dan Minkevitch Intel',
  description: 'I went to an Amazon link that Dan shared, and now all my recommendations are about LOTR and blacksmithing'
};

describe('secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('unauthenticated users can\'t access secrets', async () => {
    const res = await request(app).get('/api/v1/secrets');
    expect(res.status).toEqual(401);
  });

  it('users can post and get secrets', async () => {
    const agent = request.agent(app);
    await UserService.signUp(mockUser);
    await agent.post('/api/v1/users/sessions').send(mockUser);
    await agent.post('/api/v1/secrets').send(mockSecret);
    const res = await agent.get('/api/v1/secrets');
    expect(res.body).toEqual([mockSecret]);
  });
});
