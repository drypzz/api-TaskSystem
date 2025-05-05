const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");
router.use(UserController.validateToken);

router.get("projects", UserController.getUsers);
router.get("projects:id", UserController.getUserByID);
router.post("projects", UserController.createUser);
router.put("projects:id", UserController.updateUser);
router.delete("projects:id", UserController.deleteUser);

module.exports = router;