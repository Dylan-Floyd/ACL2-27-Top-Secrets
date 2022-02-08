const { Router } = require('express');
const authenticate = require('../middleware/authenticate.js');
const UserService = require('../services/UserService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.signUp(req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  })
  .post('/sessions', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const sessionToken = await UserService.signIn({ email, password });

      res
        .cookie(process.env.COOKIE_NAME, sessionToken, {
          httpOnly: true,
          maxAge: 86400000,
        })
        .json({ message: 'Signed in successfully!' });
    } catch (error) {
      next(error);
    }
  })
  .delete('/sessions', async (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME)
      .json({ success: true, message: 'Signed out successfully!' });
  })
  .get('/me', authenticate, (req, res) => {
    res.json(req.user);
  });
