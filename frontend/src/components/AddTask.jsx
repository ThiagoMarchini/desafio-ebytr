import React, { useState, useEffect } from 'react';
import socket from '../services/socketClient'

function AddTask ({user}) {

  function createTask () {
    const task = document.getElementById('newTask').value;
    const status = document.getElementById('newStatus').value;
    socket.emit('createTask', { status, task, user });
    console.log({ status, task, user });
  }

  return(
    <tr>
      <td><input id="newTask" type="text"></input></td>
      <td>
        <select id="newStatus" name="newStatus">
          <option value="Pendente">Pendente</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Pronto">Pronto</option>
        </select>
      </td>
      <td></td>
      <td><button onClick={createTask} type="button" className="btn btn-success"><i className="bi bi-save-fill"></i></button></td>
    </tr>
  )
};

export default AddTask;