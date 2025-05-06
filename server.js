const express = require("express");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./docs/docs.yaml");

const app = express();
app.use(express.json());

const database = require("./src/config/database");

const userRoutes = require("./src/routes/userRoutes");
const taskRoutes = require("./src/routes/taskRoutes");
const projectRoutes = require("./src/routes/projectRoutes");

const UserController = require("./src/controllers/userController");

const port = process.env.API_PORT || 3000;

// Endpoint documentação
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Endpoints login e registro
app.post("/api/v1/login", UserController.loginUser);
app.post("/api/v1/register", UserController.createUser);

// Rotas
app.use("/api/v1", userRoutes);
app.use("/api/v1", taskRoutes);
app.use("/api/v1", projectRoutes);

database.db.sync({ force: false })
.then(() => {
    app.listen(Number(port), () => {
        console.log(`🚀 Server is running on http://localhost:${port}`)
    })
})
.catch((error) => {
    console.error("❌ Error connecting to the database", error);
});