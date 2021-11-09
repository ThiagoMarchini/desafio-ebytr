<reference types="cypress" />
import React from 'react';
import { mount } from '@cypress/react';
import UsersList from '../pages/UsersList';

describe('Testa a Lista de usuários', () => {
    it('Testa se o login de um usuário inexistente retorna a mensagem correta', () => {
        mount(<UsersList user='admin' />);
        cy.get('h2').contains('Users List');
    });
})