import React from 'react';
import socket from '../services/socketClient'

function AddUser(){

  function createUser () {
    const email = document.getElementById('newUser').value;
    const role = document.getElementById('newRole').value;
    socket.emit('createUser', { email, role });
  }

  return(
    <tr>
      <td><input id="newUser" type="email"></input></td>
      <td>
        <select id="newRole" name="newRole" default="user">
          <option value="user">Usuário</option>
          <option value="admin">Administrador</option>
        </select>
      </td>
      <td></td>
      <td><button onClick={createUser} type="button" className="btn btn-success"><i className="bi bi-save-fill"></i></button></td>
    </tr>
  )
};

export default AddUser;