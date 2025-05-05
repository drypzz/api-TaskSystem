
# 📦 API RESTful com Node.js, Express, Sequelize e MySQL

Este projeto é uma API RESTful construída com **Node.js**, **Express** e **Sequelize**, utilizando **MySQL** como banco de dados relacional (via **XAMPP**). A estrutura do projeto segue a arquitetura MVC (Model-View-Controller), garantindo escalabilidade e organização.

---

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [MySQL](https://www.mysql.com/)
- [XAMPP](https://www.apachefriends.org/pt_br/index.html)
- [Dotenv](https://www.npmjs.com/package/dotenv)

---

## 📂 Estrutura de Pastas

```
src/
│
├── config/              # Configurações
│
├── controllers/         # Lógica dos controladores
│
├── models/              # Definições dos modelos Sequelize
│
└── routes/              # Rotas da API
```

---

## ⚙️ Configuração e Execução

### 1. Clonar o repositório

```bash
git clone https://github.com/drypzz/api-TaskSystem.git
cd api-TaskSystem
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env`(caso não tenha) na raiz do projeto com o seguinte conteúdo:

```env
# Database settings
DATABASE_NAME=tasksystem
DATABASE_USER=root
DATABASE_PASSWORD=
DATABASE_HOST=localhost
DATABASE_ENGINE=mysql

# JWT settings
JWT_SECRET_KEY=drypzzdev

# Port settings
API_PORT=3000
```

> ⚠️ Certifique-se de que o XAMPP está rodando com o MySQL ativo e que o banco de dados informado foi criado.

### 4. Iniciar o servidor

```bash
npm start
```

Servidor rodando em: `http://localhost:3000`

---

## 🔗 Endpoints da API

### ✔️ Login e Registro

| Método | Rota                    | Descrição                        |
|--------|-------------------------|----------------------------------|
| POST   | `/api/v1/login`         | Login e geração de token         |
| POST   | `/api/v1/register`      | Criação de novo usuário          |

### ⚠️ Rotas Protegidas (JWT)

#### 1. Endpoints Tarefas

| Método | Rota                    | Descrição                        |
|--------|-------------------------|----------------------------------|
| POST   | `/api/v1/tasks`         | Criar nova tarefa                |
| GET    | `/api/v1/tasks`         | Listar todas as tarefas          |
| GET    | `/api/v1/tasks/:id`     | Listar uma tarefas               |
| PUT    | `/api/v1/tasks/:id`     | Atualizar uma tarefa             |
| DELETE | `/api/v1/tasks/:id`     | Deletar uma tarefa               |

#### 2. Endpoints Usuarios

| Método | Rota                    | Descrição                        |
|--------|-------------------------|----------------------------------|
| POST   | `/api/v1/users`         | Criar novo usuario               |
| GET    | `/api/v1/users`         | Listar todos os usuarios         |
| GET    | `/api/v1/users/:id`     | Lista um usuario                 |
| PUT    | `/api/v1/users/:id`     | Atualizar um usuario             |
| DELETE | `/api/v1/users/:id`     | Deletar um usuario               |

#### 3. Endpoints Projects

| Método | Rota                    | Descrição                        |
|--------|-------------------------|----------------------------------|
| POST   | `/api/v1/projects`      | Criar novo projeto               |
| GET    | `/api/v1/projects`      | Listar todos os projeto          |
| GET    | `/api/v1/projects/:id`  | Lista um projeto                 |
| PUT    | `/api/v1/projects/:id`  | Atualizar um projeto             |
| DELETE | `/api/v1/projects/:id`  | Deletar um projeto               |

---

## 📌 Observações

- Os modelos Sequelize estão definidos em `src/models`.
- As rotas estão definidas em `src/routes`.
- As conexões com o banco de dados são feitas por `src/config/database.js`.
- Toda lógica de negócio está organizada nos controladores (`src/controllers`).

---

## 🛠️ Scripts Úteis

```bash
npm start          # Rodar em modo produção
```

---

> by drypzz
