const Project = require('../models/project');

class ProjectController {

    // Exibir todos os projetos
    static getProjects(req, res) {
        const projects = Project.data;

        res.json(projects);
    };

     // Exibir um projeto especifica pelo ID
    static getProjectByID(req, res) {
        const id = Number(req.params.id);
        const project = Project.data.find(e => e.id === id);

        if (!project){
            res.status(404).json({ message: 'Project not found' });
            return;
        };

        res.json(project);
    };

    // Cria um projeto
    static createProject(req, res) {
        const { name, description } = req.body;
        const id = Project.data.length + 1;
        const project = new Project(id, name, description);

        const titleRegistred = Project.data.find(e => e.name === name); // Verifica se o Titulo do Projeto ja existe

        if (titleRegistred) {
            res.status(400).json({ message: "Project already exists" })
            return;
        };

        if (name === undefined) {
            res.status(400).json({ message: 'Name is required' });
            return;  
        };

        if (description === undefined) {
            res.status(400).json({ message: 'Description is required' });
            return;
        };

        Project.data.push(project);

        res.status(201).json(project);
    };

    // Atualiza um projeto
    static updateProject(req, res) {
        const id = Number(req.params.id);
        const { name, description } = req.body;
        const project = Project.data.find(e => e.id === id);

        const titleRegistred = Project.data.find(e => e.name === name); // Verifica se o Titulo do Projeto ja existe

        if (titleRegistred) {
            res.status(400).json({ message: "Project already exists" })
            return;
        };

        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        };

        if (name === undefined) {
            res.status(400).json({ message: 'Name is required' });
            return;  
        };

        if (description === undefined) {
            res.status(400).json({ message: 'Description is required' });
            return;
        };

        project.name = name;
        project.description = description;

        res.json(project);
    };

    // Deleta um projeto
    static deleteProject(req, res) {
        const id = Number(req.params.id);
        const index = Project.data.findIndex(e => e.id === id);

        if (index === -1) {
            res.status(404).json({ message: 'Project not found' });
            return;
        };

        Project.data.splice(index, 1);

        res.json({ message: 'Project deleted' });
    };

};

module.exports = ProjectController;