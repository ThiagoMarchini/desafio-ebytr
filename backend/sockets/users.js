const { createUser, deleteUser, editUser, getAll, getUser, } = require('../models/users');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Usuário conectado: ${socket.id}`);

    socket.on('createUser', async ({ email, role }) => {
      await createUser(email, role);
      socket.emit('receiveUsers', await getAll());
    });

    socket.on('deleteUser', async ({ id, email }) => {
      await deleteUser(id, email);
      socket.emit('receiveUsers', await getAll());
    });

    socket.on('editUser', async ({ id, email, role }) => {
      await editUser(id, email, role);
      socket.emit('receiveUsers', await getAll());
    })
    
    socket.on('getAllUsers', async () => {
      socket.emit('receiveUsers', await getAll());
    });

    socket.on('getUser', async ({email, password}) => {
      socket.emit('canLogin', await getUser(email, password));
    });

    socket.on('disconnect', () => {
      console.log('Usuário desconectou');
    });
  });
};