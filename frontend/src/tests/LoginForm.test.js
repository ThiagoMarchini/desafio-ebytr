import React from 'react';
import { serverSocket, cleanUp } from 'socket.io-client';
// import mock-io from 'socket.io-client';
import {render} from '@testing-library/react';
import LoginForm from '../pages/LoginForm';

test('App should get messages', () => {
    // first render the app
    const utils = render(<LoginForm />)
    // then send a message
    serverSocket.emit('canLogin', (''));
    expect(utils.getByText('Usuário/senha inválidos!')).toBeTruthy();
})
