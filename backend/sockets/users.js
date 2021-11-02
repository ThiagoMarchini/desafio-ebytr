const { createUser, deleteUser, getAll, getUser, } = require('../models/users');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Usuário conectado: ${socket.id}`);

    socket.on('createUser', () => {
      console.log('Create user');
    });

    socket.on('deleteUser', () => {
      console.log('Delete user');
    });
    
    socket.on('getAllUsers', () => {
      console.log('Get all users');
    });

    socket.on('getUser', async ({email, password}) => {
      const response = await getUser(email, password);
      socket.emit('canLogin', response);
    });

    socket.on('disconnect', () => {
      console.log('Usuário desconectou');
    });
  });
};