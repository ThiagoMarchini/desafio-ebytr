const { MongoClient } = require('mongodb');
require('dotenv');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/';
const MONGO_DB_NAME = process.env.DB_NAME || 'tasks';

let connection = null;

const getConnection = async () => {
  connection = connection
    || (await MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => conn.db(MONGO_DB_NAME)));
    return connection;
};

module.exports = { getConnection };