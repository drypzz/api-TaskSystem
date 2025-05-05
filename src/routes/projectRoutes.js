const express = require("express");
const router = express.Router();
const ProjectController = require("../controllers/projectController");

const UserController = require("../controllers/userController");
router.use(UserController.validateToken);

router.get("users", ProjectController.getProjects);
router.get("users:id", ProjectController.getProjectByID);
router.post("users", ProjectController.createProject);
router.put("users:id", ProjectController.updateProject);
router.delete("users:id", ProjectController.deleteProject);

module.exports = router;