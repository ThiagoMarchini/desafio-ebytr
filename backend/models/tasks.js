const { ObjectId } = require('mongodb');
const connection = require('./connection');
const { getDateTime } = require('../utils/getDateTime');

const createTask = async ({ status, task, user }) => {
  const creationDate = getDateTime();
  const db = await connection.getConnection();
  const newProduct = await db.collection('user_tasks').insertOne({
    creationDate,
    status,
    task,
    user,
  });

  return newProduct;
};

const deleteTask = async (id) => {
  console.log(id);
  const db = await connection.getConnection();
  const result = await db.collection('user_tasks').deleteOne({ _id: new ObjectId(id) });
  return result;
};

const editTask = async (id, status, task) => {
  const db = await connection.getConnection();
  const result = await db.collection('user_tasks').updateOne(
    { _id: new ObjectId(id) },
    { $set: { status, task } },
  );
  console.log(result);

  return result;
};

const getTasks = async (user) => {
  console.log(`Usuário: ${user}`);
  const db = await connection.getConnection();
  const result = await db.collection('user_tasks').find({ user }).toArray();
  console.log(result)

  return result;
};

module.exports = {
  createTask,
  deleteTask,
  editTask,
  getTasks,
};