const Task = require("../models/task");
const Project = require("../models/project");
const User = require("../models/user");

class TasksController {

    // Exibir todas as tarefas
    static async getTasks(req, res) {
        try {
            const tasks = await Task.findAll();
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ message: "❌ Erro ao buscar tarefas", error });
        };
    };

    // Exibir uma tarefa específica pelo ID
    static async getTaskByID(req, res) {
        try {
            const id = Number(req.params.id);
            const task = await Task.findByPk(id);

            if (!task) {
                return res.status(404).json({ message: "❌ Tarefa não encontrada" });
            };

            res.json(task);
        } catch (error) {
            res.status(500).json({ message: "❌ Erro ao buscar tarefa", error });
        };
    };

    // Criar uma nova tarefa
    static async createTask(req, res) {
        try {
            const { titulo, status, idProject, idUser } = req.body;

            if (!titulo || !status || !idProject || !idUser) {
                return res.status(400).json({ message: "❌ Todos os campos são obrigatórios" });
            };

            const findTask = await Task.findOne({ where: { titulo } });
            if (findTask) {
                return res.status(400).json({ message: "❌ Tarefa já cadastrada" });
            };

            const findProject = await Project.findByPk(idProject);
            if (!findProject) {
                return res.status(404).json({ message: "❌ Projeto não encontrado" });
            };

            const findUser = await User.findByPk(idUser);
            if (!findUser) {
                return res.status(404).json({ message: "❌ Usuário não encontrado" });
            };

            const newTask = await Task.create({ titulo, status, idProject, idUser });

            res.status(201).json({ message: "✅ Tarefa criada com sucesso", newTask });
        } catch (error) {
            res.status(500).json({ message: "❌ Erro ao criar tarefa", error });
        };
    };

    // Atualizar uma tarefa existente
    static async updateTask(req, res) {
        try {
            const id = Number(req.params.id);
            const { titulo, status, idProject, idUser } = req.body;

            const task = await Task.findByPk(id);

            if (!task) {
                return res.status(404).json({ message: "❌ Tarefa não encontrada" });
            };

            if (titulo) task.titulo = titulo;
            if (status) task.status = status;
            if (idProject) {
                const findProject = await Project.findByPk(idProject);
                if (!findProject) {
                    return res.status(404).json({ message: "❌ Projeto não encontrado" });
                };

                task.idProject = idProject;
            };
            if (idUser) {
                const findUser = await User.findByPk(idUser);
                if (!findUser) {
                    return res.status(404).json({ message: "❌ Usuário não encontrado" });
                };

                task.idUser = idUser;
            };

            await task.save();

            res.json({ message: "✅ Tarefa atualizada com sucesso", task });
        } catch (error) {
            res.status(500).json({ message: "❌ Erro ao atualizar tarefa", error });
        };
    };

    // Deletar uma tarefa
    static async deleteTask(req, res) {
        try {
            const id = Number(req.params.id);
            const task = await Task.findByPk(id);

            if (!task) {
                return res.status(404).json({ message: "❌ Tarefa não encontrada" });
            };

            await task.destroy();

            res.json({ message: "✅ Tarefa deletada com sucesso" });
        } catch (error) {
            res.status(500).json({ message: "❌ Erro ao deletar tarefa", error });
        };
    };
};

module.exports = TasksController;
