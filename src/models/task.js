class Task {
    constructor(id, title, status, idProject, idUser) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.idProject = idProject;
        this.idUser = idUser;
    }

    static data = [
        new Task(1, 'Task 1', 'pending', 1, 1),
        new Task(2, 'Task 2', 'pending', 1, 2),
        new Task(3, 'Task 3', 'pending', 2, 1),
        new Task(4, 'Task 4', 'pending', 2, 2),
    ];
};

module.exports = Task;