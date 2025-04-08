const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

const database = require("./src/config/database");

const userRoutes = require("./src/routes/userRoutes");
const taskRoutes = require("./src/routes/taskRoutes");
const projectRoutes = require("./src/routes/projectRoutes");

const UserController = require("./src/controllers/userController");

const port = process.env.API_PORT || 3000;

app.post("/login", UserController.loginUser);
app.post("/register", UserController.createUser);

app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/projects", projectRoutes);

database.db.sync({ force: false })
.then(() => {
    app.listen(Number(port), () => {
        console.log(`🚀 Server is running on http://localhost:${port}`)
    })
})
.catch((error) => {
    console.error("❌ Error connecting to the database", error);
});