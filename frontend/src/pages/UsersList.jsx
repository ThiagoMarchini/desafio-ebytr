import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import socket from '../services/socketClient';
import AddUser from '../components/AddUser';
import User from '../components/User';
import './css/UserList.css';

function UsersList() {
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    socket.emit('getAllUsers');
    socket.on('receiveUsers', (result) => {
      setUsers(result);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <h2>Users List</h2>
      {isLoading ? (
        <p>Carregando</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="title">
                E-mail
              </th>
              <th className="title">
                Role
              </th>
              <th>Salvar</th>
              <th>Apagar</th>
            </tr>
          </thead>
          <tbody>
            <AddUser />
            {users.map(({ _id, email, role }, index) => (
              <User
                key={_id}
                id={_id}
                index={index}
                email={email}
                role={role}
              />
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default UsersList;