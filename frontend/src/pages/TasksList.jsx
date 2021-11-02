import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import socket from '../services/socketClient';
import PropTypes from 'prop-types';
import AddTask from '../components/AddTask';
import Task from '../components/Task';
import './css/TaskList.css';

function TasksList({user}) {
  const [tasks, setTasks] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    socket.emit('getTasks', user);
    socket.on('receiveTasks', (result) => {
      setTasks(result);
      setIsLoading(false);
    });
  }, []);

  const sortAscendingTasks = () => {
    let newArray = [...tasks];
    newArray.sort((a,b)=> (a.task > b.task ? 1 : -1))
    setTasks(newArray);
  }

  const sortDescendingTasks = () => {
    let newArray = [...tasks];
    newArray.sort((a,b)=> (a.task > b.task ? -1 : 1))
    setTasks(newArray);
  }

  const sortAscendingStatus = () => {
    let newArray = [...tasks];
    newArray.sort((a,b)=> (a.status > b.status ? 1 : -1))
    setTasks(newArray);
  }

  const sortDescendingStatus = () => {
    let newArray = [...tasks];
    newArray.sort((a,b)=> (a.status > b.status ? -1 : 1))
    setTasks(newArray);
  }

  const sortAscendingDate = () => {
    let newArray = [...tasks];
    newArray.sort((a,b)=> (a.creationDate > b.creationDate ? 1 : -1))
    setTasks(newArray);
  }

  const sortDescendingDate = () => {
    let newArray = [...tasks];
    newArray.sort((a,b)=> (a.creationDate > b.creationDate ? -1 : 1))
    setTasks(newArray);
  }

  return(
    <div>
      <h2>TasksList</h2>
      {isLoading ? (
        <p>Carregando</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="title">
                Tarefa
                <div>
                  <button type="button"class="btn btn-type-secondary">
                    <i onClick={sortAscendingTasks} className="bi bi-arrow-up-square-fill"></i>
                    <span className="visually-hidden">Button</span>
                  </button>
                  <button type="button"class="btn btn-type-secondary">
                    <i onClick={sortDescendingTasks} className="bi bi-arrow-down-square-fill"></i>
                    <span className="visually-hidden">Button</span>
                  </button>
                </div>
              </th>
              <th className="title">
                Status
                <div>
                  <button type="button"class="btn btn-type-secondary">
                    <i onClick={sortAscendingStatus} className="bi bi-arrow-up-square-fill"></i>
                    <span className="visually-hidden">Button</span>
                  </button>
                  <button type="button"class="btn btn-type-secondary">
                    <i onClick={sortDescendingStatus} className="bi bi-arrow-down-square-fill"></i>
                    <span className="visually-hidden">Button</span>
                  </button>
                </div>
              </th>
              <th>
                Data de criação
                <div>
                  <button type="button"class="btn btn-type-secondary">
                    <i onClick={sortAscendingDate} className="bi bi-arrow-up-square-fill"></i>
                    <span className="visually-hidden">Button</span>
                  </button>
                  <button type="button"class="btn btn-type-secondary">
                    <i onClick={sortDescendingDate} className="bi bi-arrow-down-square-fill"></i>
                    <span className="visually-hidden">Button</span>
                  </button>
                </div>
              </th>
              <th>Salvar</th>
              <th>Apagar</th>
            </tr>
          </thead>
          <tbody>
            <AddTask user={user}/>
            {tasks.map(({ _id, creationDate, status, task, user }, index) => (
              <Task
                key={_id}
                id={_id}
                index={index}
                creationDate={creationDate}
                status={status}
                task={task}
                user={user}
              />
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

TasksList.propTypes = {
  user: PropTypes.string.isRequired,
}

export default TasksList;