const { Router } = require('express');
const authenticate = require('../middleware/authenticate.js');
const Secret = require('../models/Secret.js');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const secrets = await Secret.getAll();
      res.json(secrets);
    } catch (error) {
      next(error);
    }
  })
  .post('/', authenticate, async (req, res, next) => {
    try {
      const { title, description } = req.body;
      const result = await Secret.insert({ title, description });
      res.json(result);
    } catch (error) {
      next(error);
    }
  });
