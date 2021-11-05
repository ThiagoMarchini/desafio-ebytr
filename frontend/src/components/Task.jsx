import React from 'react';
import socket from '../services/socketClient'

function Task({ id, index, creationDate, status, task, user }) {

  const changeTaskValue = (e) => {
    const original = e.target.innerText;
    e.target.innerHTML = `<input type="text" value="${original}"></input>`;
  }

  const saveTaskValue = (e) => {
    const newValue = e.target.value;
    e.target.parentElement.textContent = newValue;
  }

  const checkSelected = (value) => {
    if (value === status) {
      return true;
    }
    return false;
  }

  const removeTask = (e) => {
    const id = e.target.parentElement.parentElement.parentElement.id;
    socket.emit('deleteTask', {id, user});
  }

  const editTask = (e) => {
    const id = e.target.parentElement.parentElement.parentElement.id;
    console.log(id);
    const task = document.getElementById(`task_${id}`).innerText;
    console.log(task);
    const status = document.getElementById(`status_${id}`).value;
    console.log(status);
    socket.emit('editTask', {id, status, task, user})
  }

  return (
    <tr id={id}>
      <td id={`task_${id}`} onClick={changeTaskValue} onBlur={saveTaskValue}>{task}</td>
      <td>
      <select id={`status_${id}`} name="status">
        <option value="Pendente" selected={checkSelected('Pendente')}>Pendente</option>
        <option value="Em andamento" selected={checkSelected('Em andamento')}>Em andamento</option>
        <option value="Pronto" selected={checkSelected('Pronto')}>Pronto</option>
      </select>
      </td>
      <td id={`creation_${id}`}>{creationDate}</td>
      <td><button type="button" className="btn btn-success"><i onClick={editTask} className="bi bi-save-fill"></i></button></td>
      <td><button type="button" className="btn btn-danger"><i onClick={removeTask} className="bi bi-trash-fill"></i></button></td>
    </tr>
  );
}
export default Task;
