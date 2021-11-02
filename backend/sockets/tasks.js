const { getTasks, createTask, editTask, deleteTask } = require('../models/tasks');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Usuário conectado: ${socket.io}`);

    socket.on('createTask', async ({ status, task, user }) => {
      await createTask({ status, task, user })
      socket.emit('receiveTasks', await getTasks(user));
    });

    socket.on('deleteTask', async ({id, user}) => {
      await deleteTask(id);
      socket.emit('receiveTasks', await getTasks(user));
    });
    
    socket.on('editTask', async ({ id, status, task, user }) => {
      await editTask(id, status, task);
      socket.emit('receiveTasks', await getTasks(user));
    });

    socket.on('getTasks', async (user) => {
      console.log(await getTasks(user));
      socket.emit('receiveTasks', await getTasks(user));
    });

    socket.on('disconnect', () => {
      console.log('Usuário desconectou');
    });
  });
};