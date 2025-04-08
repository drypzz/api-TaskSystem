const express = require("express");
const router = express.Router();
const ProjectController = require("../controllers/projectController");

const UserController = require("../controllers/userController");
router.use(UserController.validateToken);

router.get("/", ProjectController.getProjects);
router.get("/:id", ProjectController.getProjectByID);
router.post("/", ProjectController.createProject);
router.put("/:id", ProjectController.updateProject);
router.delete("/:id", ProjectController.deleteProject);

module.exports = router;