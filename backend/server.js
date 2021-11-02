const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
require('dotenv');

const PORT = process.env.PORT || 3001;

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const tasksController = require('./controllers/tasks');
const usersController = require('./controllers/users')

app.use(bodyParser.json());
app.use(cors());

// app.use('/tasks', tasksController);
// app.use('/users', usersController);
require('./sockets/tasks')(io);
require('./sockets/users')(io);

http.listen(PORT, () => console.log(`Back-End Rodando na porta ${PORT}`));