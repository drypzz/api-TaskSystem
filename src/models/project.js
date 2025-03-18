class Project {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    static data = [
        new Project(1, 'Project 1', 'Description 1'),
        new Project(2, 'Project 2', 'Description 2'),
    ];
};

module.exports = Project;