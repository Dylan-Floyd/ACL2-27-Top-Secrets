const { Router } = require('express');
const authenticate = require('../middleware/authenticate.js');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const secrets = 'secret';
      res.json(secrets);
    } catch (error) {
      next(error);
    }
  });
