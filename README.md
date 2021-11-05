# Desafio Técnico Ebytr
Repositório do projeto Desafio Técnico Ebytr (Trybe)

# Objetivo
Desenvolver um sistema, com a stack MERN para a organização individual das tarefas de seus funcionários.

# Requisitos Técnicos
- Front-End em React
- Back-End em MongoDB
- Arquitetura em camadas

# Funcionalidades

1) Visualizar a lista de tarefas, que deve ser ordenável por:
     - Ordem alfabética
     - Data de criação
     - Status
2) Inserção de tarefa na lista
3) Remoção de tarefa na lista
4) O status da tarefa deve ser editável:
     - Pendente
     - Em andamento
     - Pronto

# Instalação
- Clonar o repositório: 
  ```
  $ git clone git@github.com:ThiagoMarchini/desafio-ebytr.git
  ```
- Entre na pasta criada:
  ```
  $ cd desafio-ebytr
  ```
- Na pasta haverá dois diretórios: frontend e backend.
- Entre no diretório frontend e faça a instalação dos pacotes:
  ```
  $ cd frontend
  $ npm install
  ```
- Repita a operação acima para o diretório backend:
  ```
  $ cd backend 
  $ npm install
  ```
- Crie a database 'tasks' com as coleções 'user_tasks' e 'users' no MongoDB:
  ```
  const database = 'tasks';
  const collection1 = 'NEW_COLLECTION_NAME';

  use('tasks');

  db.createCollection('user_tasks');
  db.createCollection('users');
  ```
- Insira na database dois usuários: um, admin, e um user:
  ```
  use("users")
  db.collection.insertMany(
    [ 
      {
        email: "user@ebytr.com",
        password: "123456",
        role: "user",
      },
      {
        email: "admin@ebytr.com",
        password: "123456",
        role: "admin",
      },
    ],
  )
  ```
- Inicie o backend:
  ```
  $ cd backend
  $ node server.js
  ```
- Inicie o frontend:
  ```
  $ cd frontend
  $ npm start
  ```

- Acesse a aplicação em: [http://localhost:3000](http://localhost:3000)

# Uso
- O Usuário 'admin' tem permissão de edição, criação e remoção dous usuários.
- Após o login do 'admin' há o direcionamento para a UI de Gestão de usuários.
- O usuário comum (role: user) após o login é direcionado para a UI de criação, edição e remoção das suas tarefas.

# Próximos passos
1) Implementar os testes no frontend e backend.
2) Implementar a verificação dos emails ao cadastrar usuário.
3) Ao cadastrar um novo usuário, gerar uma senha e enviá-la por email.
3) Implementar a mudança da própria senha pelo usuário.