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

  return(
    <div>
      <h2>TasksList</h2>
      {isLoading ? (
        <p>Carregando</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="table-title">
                Tarefa
                <div>
                  <i className="bi bi-arrow-up"></i>
                  <i className="bi bi-arrow-down"></i>
                </div>
              </th>
              <th>Status</th>
              <th>Data de criação</th>
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