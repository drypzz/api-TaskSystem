const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");
router.use(UserController.validateToken);

router.get("/users", UserController.getUsers);
router.get("/users/:id", UserController.getUserByID);
router.post("/users", UserController.createUser);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

module.exports = router;