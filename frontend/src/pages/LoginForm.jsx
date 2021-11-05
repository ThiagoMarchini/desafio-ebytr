import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import socket from '../services/socketClient'
import PropTypes from 'prop-types';
import './css/LoginForm.css';

function LoginForm ({ setUser, setRole }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    socket.on('canLogin', (result) => {
      const span = document.getElementById('not_found');
      if (result) {
        setUser(result.email);
        setRole(result.role);
      }
      if (!result) span.innerText = 'Usuário/senha inválidos!';
    });
  }, []);
  
  let login = async () => {
    socket.emit('getUser', { email, password });
  };

  return (
    <Container className="login">
      <div className="top-info">
        <h1>Login:</h1>
        <span data-testid="error" id="not_found"></span>
      </div>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                data-testid="email-input"
                id="email"
                onChange={e => setEmail(e.target.value)}
                placeholder="Digite o seu email" 
                type="email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">Senha</Form.Label>
              <Form.Control
                data-testid="password-input"
                id="password"
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder="Digite sua senha"
              />
            </Form.Group>
            <Button data-testid="login-button" className="login-button" variant="primary" onClick={ login }>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setRole: PropTypes.func.isRequired,
}

export default LoginForm;