const express = require('express');
const app = express();

const ProjectController = require('./src/controllers/projectController');
const TasksController = require('./src/controllers/taskController');
const UserController = require('./src/controllers/userController');

const port = 5000; // Porta do servidor

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Rotas para os projetos

app.get('/projects', ProjectController.getProjects);
app.get('/projects/:id', ProjectController.getProjectByID);
app.post('/projects', ProjectController.createProject);
app.put('/projects/:id', ProjectController.updateProject);
app.delete('/projects/:id', ProjectController.deleteProject);

// Rotas para as tarefas

app.get('/tasks', TasksController.getTasks);
app.get('/tasks/:id', TasksController.getTaskByID);
app.post('/tasks', TasksController.createTask);
app.put('/tasks/:id', TasksController.updateTask);
app.delete('/tasks/:id', TasksController.deleteTask);

// Rotas para os usuarios

app.get('/users', UserController.getUsers);
app.get('/users/:id', UserController.getUserByID);
app.post('/users', UserController.createUser);
app.put('/users/:id', UserController.updateUser);
app.delete('/users/:id', UserController.deleteUser);


// Iniciar servidor

app.listen(Number(port), () => {
    console.log(`🚀 Server is running in http://localhost:${port}`);
});