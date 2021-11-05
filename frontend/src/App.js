import React, { useState } from 'react';
import LoginForm from './pages/LoginForm'
import TasksList from './pages/TasksList';
import UsersList from './pages/UsersList';
import './App.css';

function App() {
  const [user, setUser] = useState();
  const [role, setRole] = useState();

  if (!user && !role) {
    return <LoginForm setUser={setUser} setRole={setRole} />
  }

  if (user && role === 'admin') {
    return <UsersList />
  }

  return <TasksList user={user} />;
}

export default App;
