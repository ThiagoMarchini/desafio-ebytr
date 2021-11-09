const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
require('dotenv');

const PORT = process.env.PORT || 3001;

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:37115'],
    methods: ['GET', 'POST'],
  },
});

app.use(bodyParser.json());
app.use(cors());

require('./sockets/tasks')(io);
require('./sockets/users')(io);

http.listen(PORT, () => console.log(`Back-End Rodando na porta ${PORT}`));