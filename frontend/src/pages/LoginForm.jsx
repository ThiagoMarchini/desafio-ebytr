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
      if (result) {
        setUser(result.email);
        setRole(result.role);
      }
      if (!result) {
        const topInfo = document.getElementById("top");
        console.log(topInfo);
        const span = document.createElement("span");
        span.className = "span";
        span.innerText = 'Usuário/senha inválidos!';
        topInfo.appendChild(span);
      }
    });
  }, []);
  
  let login = async () => {
    try {
      socket.emit('getUser', { email, password });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container className="login">
      <div className="top-info" id="top">
        <h1>Login:</h1>
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
            <Button id="login-button" className="login-button" variant="primary" onClick={ login }>
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