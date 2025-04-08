const database = require("../config/database");

class Task {
    constructor() {
        this.model = database.db.define("tasks", {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            titulo: {
                type: database.db.Sequelize.STRING
            },
            status: {
                type: database.db.Sequelize.STRING
            },
            idProject: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: "projects",
                    key: "id"
                }
            },
            idUser: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: "users",
                    key: "id"
                }
            }
        });
    };
};

module.exports = (new Task).model;