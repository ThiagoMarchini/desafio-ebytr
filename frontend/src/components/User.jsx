import React from 'react';
import socket from '../services/socketClient'

function User({ id, email, role }) {

  const changeUser = (e) => {
    const original = e.target.innerText;
    e.target.innerHTML = `<input type="text" value="${original}"></input>`;
  }

  const saveUser = (e) => {
    const newValue = e.target.value;
    e.target.parentElement.textContent = newValue;
  }

  const checkSelected = (value) => {
    if (value === role) {
      return true;
    }
    return false;
  }

  const removeUser = (e) => {
    const id = e.target.parentElement.parentElement.parentElement.id;
    socket.emit('deleteUser', {id, email});
  }

  const editUser = (e) => {
    const id = e.target.parentElement.parentElement.parentElement.id;
    console.log(id);
    const email = document.getElementById(`user_${id}`).innerText;
    console.log(email);
    const role = document.getElementById(`role_${id}`).value;
    console.log(role);
    socket.emit('editUser', {id, email, role})
  }

  return (
    <tr id={id}>
      <td id={`user_${id}`} onClick={changeUser} onBlur={saveUser}>{email}</td>
      <td>
        <select id={`role_${id}`} name="role">
          <option value="admin" selected={checkSelected('admin')}>Administrador</option>
          <option value="user" selected={checkSelected('user')}>Usuário</option>
        </select>
      </td>
      <td>
        <button type="button" className="btn btn-success">
          <i onClick={editUser} className="bi bi-save-fill"></i>
        </button>
      </td>
      <td>
        <button type="button" className="btn btn-danger">
          <i onClick={removeUser} className="bi bi-trash-fill"></i>
        </button>
      </td>
    </tr>
  );
}
export default User;
