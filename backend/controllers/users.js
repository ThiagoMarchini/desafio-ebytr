const { Router } = require('express');

const usersModel = require('../models/users');

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await usersModel.getUser(email, password);
  console.log(result);
  if (result) {
    console.log(result)
    return res.status(200).json({ found: result });
  }
  return res.status(404).json({ message: "User not found" });
});

router.get('/', async (_req, res) => {
  const users = await usersModel.getAll();
  res.status(200).json(users);
});

module.exports = router;