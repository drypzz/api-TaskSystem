const express = require("express");
const router = express.Router();
const TasksController = require("../controllers/taskController");

const UserController = require("../controllers/userController");
router.use(UserController.validateToken);

router.get("/tasks", TasksController.getTasks);
router.get("/tasks/:id", TasksController.getTaskByID);
router.post("/tasks", TasksController.createTask);
router.put("/tasks/:id", TasksController.updateTask);
router.delete("/tasks/:id", TasksController.deleteTask);

module.exports = router;