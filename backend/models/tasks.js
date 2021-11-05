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

  return result;
};

const getTasks = async (user) => {
  const db = await connection.getConnection();
  const result = await db.collection('user_tasks').find({ user }).toArray();

  return result;
};

module.exports = {
  createTask,
  deleteTask,
  editTask,
  getTasks,
};