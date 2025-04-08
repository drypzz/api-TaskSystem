const Project = require("../models/project");

class ProjectController {

    // Exibir todos os projetos
    static async getProjects(req, res) {
        try {
            const projects = await Project.findAll();
            res.json(projects);
        } catch (error) {
            res.status(500).json({ message: "❌ Erro ao buscar projetos", error });
        };
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

            project.titulo = titulo ?? project.titulo;
            project.descricao = descricao ?? project.descricao;

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

            await project.destroy();

            res.json({ message: "✅ Projeto deletado com sucesso" });
        } catch (error) {
            res.status(500).json({ message: "❌ Erro ao deletar projeto", error });
        };
    };
};

module.exports = ProjectController;
