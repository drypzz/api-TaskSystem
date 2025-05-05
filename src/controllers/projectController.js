const Project = require("../models/project");
const Task = require("../models/task");

class ProjectController {

    // Exibir todos os projetos
    static async getProjects(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 30;

            if (!page) {
                const projects = await Project.findAll();
                return res.json({ totalprojects: projects.length, projects });
            };

            const offset = (page - 1) * limit;

            const { count, rows: projects } = await Project.findAndCountAll({ limit, offset });

            if (projects.length === 0){
                return res.status(404).json({ message: "❌ Nenhum projeto encontrado para esta página." });
            };
    
            res.json({
                currentPage: page,
                totalInPage: projects.length,
                totalPages: Math.ceil(count / limit),
                totalprojects: count,
                projects,
            });
        } catch (error) {
            res.status(500).json({ message: "❌ Erro ao buscar tarefas", error });
        }
    };

    // Exibir um projeto específico pelo ID
    static async getProjectByID(req, res) {
        try {
            const id = Number(req.params.id);
            const project = await Project.findByPk(id);

            if (!project) {
                return res.status(404).json({ message: "❌ Projeto não encontrado" });
            };

            res.json(project);
        } catch (error) {
            res.status(500).json({ message: "❌ Erro ao buscar projeto", error });
        };
    };

    // Criar um novo projeto
    static async createProject(req, res) {
        try {
            const { titulo, descricao } = req.body;

            if (!titulo || !descricao) {
                return res.status(400).json({ message: "❌ Todos os campos são obrigatórios" });
            };

            const findProject = await Project.findOne({ where: { titulo } });
            if (findProject) {
                return res.status(400).json({ message: "❌ Projeto já cadastrado" });
            };

            const newProject = await Project.create({ titulo, descricao });

            res.status(201).json({ message: "✅ Projeto criado com sucesso", project: newProject });
        } catch (error) {
            res.status(500).json({ message: "❌ Erro ao criar projeto", error });
        };
    };

    // Atualizar um projeto existente
    static async updateProject(req, res) {
        try {
            const id = Number(req.params.id);
            const { titulo, descricao } = req.body;

            const project = await Project.findByPk(id);

            if (!project) {
                return res.status(404).json({ message: "❌ Projeto não encontrado" });
            };

            if (titulo){
                const findProject = await Project.findOne({ where: { titulo } });
                if (findProject && findProject.id !== id) {
                    return res.status(400).json({ message: "❌ Projeto já cadastrado" });
                };

                project.titulo = titulo;
            };
            
            if (descricao) project.descricao = descricao;

            await project.save();

            res.json({ message: "✅ Projeto atualizado com sucesso", project });
        } catch (error) {
            res.status(500).json({ message: "❌ Erro ao atualizar projeto", error });
        };
    };

    // Deletar um projeto
    static async deleteProject(req, res) {
        try {
            const id = Number(req.params.id);
            const project = await Project.findByPk(id);

            if (!project) {
                return res.status(404).json({ message: "❌ Projeto não encontrado" });
            };

            const tarefas = await Task.findAll({ where: { idProject: id } });
            if (tarefas.length > 0) {
                await Task.destroy({ where: { idProject: id } });
            };

            await project.destroy();

            res.json({ message: `✅ Projeto deletado com sucesso${tarefas.length > 0 ? ` junto com ${tarefas.length} tarefa(s)` : ""}`});
        } catch (error) {
            res.status(500).json({ message: "❌ Erro ao deletar projeto", error });
        };
    };
};

module.exports = ProjectController;
