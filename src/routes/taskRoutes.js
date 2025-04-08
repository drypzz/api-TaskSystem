const express = require("express");
const router = express.Router();
const TasksController = require("../controllers/taskController");

const UserController = require("../controllers/userController");
router.use(UserController.validateToken);

router.get("/", TasksController.getTasks);
router.get("/:id", TasksController.getTaskByID);
router.post("/", TasksController.createTask);
router.put("/:id", TasksController.updateTask);
router.delete("/:id", TasksController.deleteTask);

module.exports = router;