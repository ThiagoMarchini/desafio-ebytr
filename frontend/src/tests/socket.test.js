import socketIOClient from 'socket.io-client';
import MockedSocket from 'socket.io-mock';
import React from 'react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App'

jest.mock('socket.io-client');

describe('Testing connection', () => {
  let socket;

  beforeEach(() => {
    socket = new MockedSocket();
    socketIOClient.mockReturnValue(socket);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should dispatch connect event', () => {
    render(<App />)
    expect(socketIOClient.connect).toHaveBeenCalled();
  });

  it('should emit message:new', done  => {
    socket.on('message:new', (data)=>{
        expect(data).toEqual(['message1', 'message2']);
        done();
    });

    socket.socketClient.emit('message:new', ['message1', 'message2']);

  });
});