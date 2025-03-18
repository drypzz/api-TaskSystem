const User = require('../models/user');

class UserController {
    
    // Exibir todos os usuarios
    static getUsers(req, res) {
        const users = User.data;
        
        res.json(users);
    }

    // Exibir um usuario especifico pelo ID
    static getUserByID(req, res) {
        const id = Number(req.params.id);
        const user = User.data.find(e => e.id === id);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        };

        res.json(user);
    }

    // Cria um usuario
    static createUser(req, res) {
        const { name, email, password } = req.body;
        const id = User.data.length + 1;
        const user = new User(id, name, email, password);

        const emailRegistred = User.data.find(e => e.email === email); // Verifica se o Email do usuario ja existe

        if (emailRegistred) {
            res.status(400).json({ message: 'Email already exist' });
            return;
        };

        if (name === undefined) {
            res.status(400).json({ message: 'Name is required' });
            return;  
        };

        if (email === undefined) {
            res.status(400).json({ message: 'Email is required' });
            return;
        };

        if (password === undefined) {
            res.status(400).json({ message: 'Password is required' });
            return;
        };


        User.data.push(user);

        res.status(201).json(user);
    }

    // Atualiza o usuario
    static updateUser(req, res) {
        const id = Number(req.params.id);
        const { name, email } = req.body;
        const user = User.data.find(e => e.id === id);

        const emailRegistred = User.data.find(e => e.email === email); // Verifica se o Email do usuario ja existe

        if (emailRegistred) {
            res.status(400).json({ message: 'Email already exist' });
            return;
        };

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        };

        if (name === undefined) {
            res.status(400).json({ message: 'Name is required' });
            return;  
        };

        if (email === undefined) {
            res.status(400).json({ message: 'Email is required' });
            return;
        };

        user.name = name;
        user.email = email;

        res.json(user);
    }

    // Deleta um usuario
    static deleteUser(req, res) {
        const id = Number(req.params.id);
        const index = User.data.findIndex(e => e.id === id);

        if (index === -1) {
            res.status(404).json({ message: 'User not found' });
            return;
        };

        User.data.splice(index, 1);

        res.json({ message: 'User deleted' });
    }
}

module.exports = UserController;