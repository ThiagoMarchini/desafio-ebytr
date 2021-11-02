const connection = require('./connection');

const createUser = async ({ email, password }) => {
  const db = await connection.getConnection();
  const newUser = await db.collection('users').insertOne({
    email,
    password,
  });

  return newUser;
};

const deleteUser = async (email) => {
  const db = await connection.getConnection();
  const result = await db.collection('users').deleteOne({ email });
  return result;
};

const getAll = async () => {
  const db = await connection.getConnection();
  const users = await db.collection('users').find().toArray();
  return users;
};

const getUser = async (email, password) => {
  const db = await connection.getConnection();
  try {
    const result = await db.collection('users').findOne({ email });
    if (result.email === email && result.password === password) {
      return result;
    }
  } catch (_e) {
    return false;
  }
};

module.exports = {
  createUser,
  deleteUser,
  getAll,
  getUser,
};