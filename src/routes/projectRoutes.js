const express = require("express");
const router = express.Router();
const ProjectController = require("../controllers/projectController");

const UserController = require("../controllers/userController");
router.use(UserController.validateToken);

router.get("/projects", ProjectController.getProjects);
router.get("/projects/:id", ProjectController.getProjectByID);
router.post("/projects", ProjectController.createProject);
router.put("/projects/:id", ProjectController.updateProject);
router.delete("/projects/:id", ProjectController.deleteProject);

module.exports = router;