import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import socket from '../services/socketClient'
import PropTypes from 'prop-types';
import './css/LoginForm.css'

function LoginForm ({ setUser, setRole }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    socket.on('canLogin', (result) => {
      const span = document.getElementById('not_found');
      if (result) {
        setUser(result.email);
        setRole(result.role);
      };
      if (!result) span.innerText = 'Usuário/senha inválidos!';
    });
  }, []);
  
  let login = async () => {
    socket.emit('getUser', { email, password });
  };

  return (
    <Container className="login">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <span id="not_found"></span>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                id="email"
                onChange={e => setEmail(e.target.value)}
                placeholder="Digite o seu email" 
                type="email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                id="password"
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder="Senha"
              />
            </Form.Group>
            <Button className="login-button" variant="primary" onClick={ login }>
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