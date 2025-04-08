const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");
router.use(UserController.validateToken);

router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUserByID);
router.post("/", UserController.createUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

module.exports = router;