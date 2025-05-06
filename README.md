
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

<details>
  <summary>POST - /api/v1/register</summary>

### Request:
  ```json
    {
        "nome": "dpz",
        "email": "dpz@gmail.com",
        "senha": "123456"
    }
  ```

### Result:
  ```json
   {
        "message": "✅ Usuário criado com sucesso",
        "newUser": {
            "id": 3,
            "nome": "dpz",
            "email": "dpz@gmail.com",
            "senha": "$2EK8X4qsRLZNvG",
            "createdAt": "0000-00-00T00:00:00.000Z",
            "updatedAt": "0000-00-00T00:00:00.000Z"
        }
   }
  ```
</details>

<details>
  <summary>POST - /api/v1/login</summary>

### Request:
  ```json
    {
        "email": "dpz@gmail.com",
        "senha": "123456"
    }
  ```

### Result:
  ```json
   {
        "message": "✅ Login realizado com sucesso",
        "token": "OjE3NDY7VZN8XcWfqTcMhntrbU"
   }
  ```
</details>

---

> [!WARNING]
> Endpoints protegidos por autenticação JWT.

### 🔗 Users

<details>
  <summary>GET - /api/v1/users</summary>

### Info
> Esse endpoint possui o parametro (?page=) como opcional.
> Caso o parametro page seja implementado no endpoint, ira retornar um limite de 30 por pagina.

### Result:
  ```json
    {
        "currentPage": 1,
        "totalPages": 1,
        "totalInPage": 0,
        "totalUsers": 0,
        "users": []
    }
  ```

</details>

<details>
  <summary>GET - /api/v1/users/{id}</summary>

### Result:
  ```json
    {
        "id": 1,
        "nome": "testeee",
        "email": "email@gmail.com",
        "senha": "$J5VgD78T6sUtwzu",
        "createdAt": "0000-00-00T00:00:00.000Z",
        "updatedAt": "0000-00-00T00:00:00.000Z"
    }
  ```
</details>

<details>
  <summary>POST - /api/v1/users</summary>

### Request:
  ```json
    {
        "nome": "teste",
        "email": "email2@gmail.com",
        "senha": "123456"
    }
  ```

### Result:
  ```json
   {
        "message": "✅ Usuário criado com sucesso",
        "newUser": {
            "id": 3,
            "nome": "teste",
            "email": "email2@gmail.com",
            "senha": "$2EK8X4qsRLZNvG",
            "createdAt": "0000-00-00T00:00:00.000Z",
            "updatedAt": "0000-00-00T00:00:00.000Z"
        }
   }
  ```
</details>

<details>
  <summary>PUT - /api/v1/users/{id}</summary>

### Info
> O método PUT se comporta igual ao método PATCH, ou seja, caso queira alterar somente o nome, apenas envie o nome, assim sucessivamente.

### Request:
  ```json
    {
        "nome": "teste234",
    }
  ```

### Result:
  ```json
   {
        "message": "✅ Usuário atualizado com sucesso",
        "user": {
            "id": 3,
            "nome": "teste234",
            "email": "email2@gmail.com",
            "senha": "$2EK8X4qsRLZNvG",
            "createdAt": "0000-00-00T00:00:00.000Z",
            "updatedAt": "0000-00-00T00:00:00.000Z"
        }
   }
  ```
</details>

<details>
  <summary>DELETE - /api/v1/users/{id}</summary>

### Result:
  ```json
    {
        "message": "Deletado com sucesso",
    }
  ```
</details>

---

> [!WARNING]
> Endpoints protegidos por autenticação JWT.

### 🔗 Projects

<details>
  <summary>GET - /api/v1/projects</summary>

### Info
> Esse endpoint possui o parametro (?page=) como opcional.
> Caso o parametro page seja implementado no endpoint, ira retornar um limite de 30 por pagina.

### Result:
  ```json
    {
        "currentPage": 1,
        "totalPages": 1,
        "totalInPage": 0,
        "totalProjects": 0,
        "projects": []
    }
  ```

</details>

<details>
  <summary>GET - /api/v1/projects/{id}</summary>

### Result:
  ```json
    {
        "id": 1,
        "titulo": "Gx",
        "descricao": "Navegador",
        "createdAt": "0000-00-00T00:00:00.000Z",
        "updatedAt": "0000-00-00T00:00:00.000Z"
    }
  ```
</details>

<details>
  <summary>POST - /api/v1/projects</summary>

### Request:
  ```json
    {
        "titulo": "teste2222",
        "descricao": "dasdasdasdasd"
    }
  ```

### Result:
  ```json
   {
        "message": "✅ Projeto criado com sucesso",
        "newProject": {
            "id": 2,
            "titulo": "teste2222",
            "descricao": "dasdasdasdasd",
            "createdAt": "0000-00-00T00:00:00.000Z",
            "updatedAt": "0000-00-00T00:00:00.000Z"
        }
   }
  ```
</details>

<details>
  <summary>PUT - /api/v1/projects/{id}</summary>

### Info
> O método PUT se comporta igual ao método PATCH, ou seja, caso queira alterar somente o titulo, apenas envie o titulo, assim sucessivamente.

### Request:
  ```json
    {
        "titulo": "teste2222232323",
    }
  ```

### Result:
  ```json
   {
        "message": "✅ Projeto atualizado com sucesso",
        "project": {
            "id": 2,
            "titulo": "teste2222232323",
            "descricao": "dasdasdasdasd",
            "createdAt": "0000-00-00T00:00:00.000Z",
            "updatedAt": "0000-00-00T00:00:00.000Z"
        }
   }
  ```
</details>

<details>
  <summary>DELETE - /api/v1/projects/{id}</summary>

### Result:
  ```json
    {
        "message": "Deletado com sucesso",
    }
  ```
</details>

---

> [!WARNING]
> Endpoints protegidos por autenticação JWT.

### 🔗 Tasks

<details>
  <summary>GET - /api/v1/tasks</summary>

### Info
> Esse endpoint possui o parametro (?page=) como opcional.
> Caso o parametro page seja implementado no endpoint, ira retornar um limite de 30 por pagina.

### Result:
  ```json
    {
        "currentPage": 1,
        "totalPages": 1,
        "totalInPage": 0,
        "totalTasks": 0,
        "tasks": []
    }
  ```

</details>

<details>
  <summary>GET - /api/v1/tasks/{id}</summary>

### Result:
  ```json
    {
        "id": 1,
        "titulo": "Desenvolver 1",
        "status": "Pendente",
        "idProject": 2,
        "idUser": 1,
        "createdAt": "0000-00-00T00:00:00.000Z",
        "updatedAt": "0000-00-00T00:00:00.000Z"
    }
  ```
</details>

<details>
  <summary>POST - /api/v1/tasks</summary>

### Request:
  ```json
    {
        "titulo": "Desenvolver 33",
        "status": "Pendente",
        "idProject": 1,
        "idUser": 3
    }
  ```

### Result:
  ```json
   {
        "message": "✅ Tarefa criada com sucesso",
        "newTask": {
            "id": 2,
            "titulo": "Desenvolver 33",
            "status": "Pendente",
            "idProject": 1,
            "idUser": 3
            "createdAt": "0000-00-00T00:00:00.000Z",
            "updatedAt": "0000-00-00T00:00:00.000Z"
        }
   }
  ```
</details>

<details>
  <summary>PUT - /api/v1/tasks/{id}</summary>

### Info
> O método PUT se comporta igual ao método PATCH, ou seja, caso queira alterar somente o titulo, apenas envie o titulo, assim sucessivamente.

### Request:
  ```json
    {
        "titulo": "Desenvolver 9405",
        "status": "Concluido"
    }
  ```

### Result:
  ```json
   {
        "message": "✅ Tarefa atualizada com sucesso",
        "task": {
            "id": 2,
            "titulo": "Desenvolver 33",
            "status": "Pendente",
            "idProject": 1,
            "idUser": 3
            "createdAt": "0000-00-00T00:00:00.000Z",
            "updatedAt": "0000-00-00T00:00:00.000Z"
        }
   }
  ```
</details>

<details>
  <summary>DELETE - /api/v1/tasks/{id}</summary>

### Result:
  ```json
    {
        "message": "Deletado com sucesso",
    }
  ```
</details>

---

## 📙 Modelos

<details>
  <summary>Users</summary>
  
  ```js
     {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: STRING
        },
        email: {
            type: STRING
        },
        senha: {
            type: STRING
        }
     }
  ```
</details>

<details>
  <summary>Projects</summary>
  
  ```js
     {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: STRING
        },
        descricao: {
            type: STRING
        }
     }
  ```
</details>

<details>
  <summary>Tasks</summary>
  
  ```js
     {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: STRING
        },
        status: {
            type: STRING
        },
        idProject: {
            type: INTEGER,
            references: {
                model: "projects",
                key: "id"
            }
        },
        idUser: {
            type: INTEGER,
            references: {
                model: "users",
                key: "id"
            }
        }
     }
  ```
</details>

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
