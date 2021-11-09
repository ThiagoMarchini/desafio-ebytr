<reference types="cypress" />
import React from 'react';
import { mount } from '@cypress/react';
import App from '../App';

describe('Testa o login', () => {
    it('Testa se o login de um usuário inexistente retorna a mensagem correta', () => {
        mount(<App />);
        cy.get('h1').contains('Login:');
        cy.get('input[id=email]').type('xablau');
        cy.get('input[id=password]').type('xablau');
        cy.get('button').click();
        cy.get('span').should('contain', 'Usuário/senha inválidos!')
    });

    it('Testa se o login do admin direciona para a página de gestão de usuários', () => {
        mount(<App />);
        cy.get('h1').contains('Login:');
        cy.get('input[id=email]').type('admin@ebytr.com');
        cy.get('input[id=password]').type('123456');
        cy.get('button').click();
        cy.get('h2').should('contain', 'Users List');
    });
    it('Testa se o login do usuário direciona para a página de tarefas', () => {
        mount(<App />);
        cy.get('h1').contains('Login:');
        cy.get('input[id=email]').type('user@ebytr.com');
        cy.get('input[id=password]').type('123456');
        cy.get('button').click();
        cy.get('h2').should('contain', 'Tasks List');
    });
})