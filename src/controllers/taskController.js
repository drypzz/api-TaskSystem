const Task = require('../models/task');
const Project = require('../models/project');
const User = require('../models/user');

class TasksController {

    // Exbir todas as tarefas
    static getTasks(req, res) {
        const tasks = Task.data;

        res.json(tasks);
    };

    // Exibir uma tarefa especifica pelo ID
    static getTaskByID(req, res) {
        const id = Number(req.params.id);
        const task = Task.data.find(e => e.id === id);

        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        };

        res.json(task);
    };

    // Criar uma tarefa
    static createTask(req, res) {
        const { title, status, idProject, idUser } = req.body;
        const id = Task.data.length + 1;
        const task = new Task(id, title, status, idProject, idUser);

        const titleRegistred = Task.data.find(e => e.title === title); // Verifica se o Titulo da Tarefa ja existe
        const project = Project.data.find(e => e.id === idProject); // Verifica se o projeto de tal ID existe/
        const user = User.data.find(e => e.id === idUser); // Verifica se o usuario de tal ID existe
        
        if (titleRegistred) {
            res.status(400).json({ message: "Task already exists" })
            return;
        };

        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        };

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        };

        if (title === undefined) {
            res.status(400).json({ message: 'Title is required' });
            return;  
        };

        if (status === undefined) {
            res.status(400).json({ message: 'Status is required' });
            return;
        };

        if (idProject === undefined) {
            res.status(400).json({ message: 'idProject is required' });
            return;
        };

        if (idUser === undefined) {
            res.status(400).json({ message: 'idUser is required' });
            return;
        };

        Task.data.push(task);

        res.status(201).json(task);
    };

    // Atualizar a tarefa
    static updateTask(req, res) {
        const id = Number(req.params.id);
        const { title, status, idProject, idUser } = req.body;
        const task = Task.data.find(e => e.id === id);

        const project = Project.data.find(e => e.id === idProject); // Verifica se o projeto de tal ID existe/
        const user = User.data.find(e => e.id === idUser); // Verifica se o usuario de tal ID existe

        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        };

        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        };

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        };

        if (title === undefined) {
            res.status(400).json({ message: 'Title is required' });
            return;  
        };

        if (status === undefined) {
            res.status(400).json({ message: 'Status is required' });
            return;
        };

        if (idProject === undefined) {
            res.status(400).json({ message: 'idProject is required' });
            return;
        };

        if (idUser === undefined) {
            res.status(400).json({ message: 'idUser is required' });
            return;
        };

        task.title = title;
        task.status = status;
        task.idProject = idProject;
        task.idUser = idUser;

        res.json(task);
    };

    // Deletar uma tarefa
    static deleteTask(req, res) {
        const id = Number(req.params.id);
        const index = Task.data.findIndex(e => e.id === id);

        if (index === -1) {
            res.status(404).json({ message: 'Task not found' });
            return;
        };

        Task.data.splice(index, 1);

        res.json({ message: 'Task deleted' });
    };

};

module.exports = TasksController;