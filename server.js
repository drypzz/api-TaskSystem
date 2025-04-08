const express = require('express');
const app = express();
const port = 3000;
const database = require('./src/config/database');

const userRoutes = require('./src/routes/userRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const projectRoutes = require('./src/routes/projectRoutes');

const UserController = require('./src/controllers/userController');

app.use(express.json());

// Login
app.post('/login', UserController.login);
app.post('/register', UserController.register);

// Usando os routers
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/projects', projectRoutes);

// Inicia o servidor
database.db.sync({ force: true })
.then(() => {
    app.listen(Number(port), () => {
        console.log(`🚀 Server is running on http://localhost:${port}`)
    })
})
.catch((error) => {
    console.error('❌ Error connecting to the database', error);
});