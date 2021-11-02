const { Router } = require('express');

const tasksModel = require('../models/tasks');

const router = Router();

router.get('/', async (req, res) => {
  const { user } = req;
  const tasks = await tasksModel.getTasks(user);
  res.status(200).json(tasks);
});

module.exports = router;