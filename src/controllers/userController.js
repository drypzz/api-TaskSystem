const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserController {
    
    // Exibir todos os usuários
    static async getUsers(req, res) {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar usuários', error });
        };
    };

    // Exibir um usuário específico pelo ID
    static async getUserByID(req, res) {
        try {
            const id = Number(req.params.id);
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar usuário', error });
        };
    };

    // Criar um novo usuário
    static async createUser(req, res) {
        try {
            const { nome, email, senha } = req.body;

            if (!nome || !email || !senha) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
            };

            const findEmail = await User.findOne({ where: { email } });
            if (findEmail) {
                return res.status(400).json({ message: 'Email já cadastrado' });
            };
            
            const hashedPassword = await bcrypt.hash(senha, 10);
            const newUser = await User.create({ nome, email, senha: hashedPassword });

            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar usuário', error });
        };
    };

    // Atualizar um usuário existente
    static async updateUser(req, res) {
        try {
            const id = Number(req.params.id);
            const { nome, email, senha } = req.body;

            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            };

            user.nome = nome ?? user.nome;
            user.email = email ?? user.email;
            user.senha = senha ?? user.senha;

            await user.save();

            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar usuário', error });
        };
    };

    // Deletar um usuário
    static async deleteUser(req, res) {
        try {
            const id = Number(req.params.id);
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            };

            await user.destroy();

            res.json({ message: 'Usuário deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar usuário', error });
        };
    };

    // Autenticação de login
    static async login(req, res) {
        try {
            const { email, senha } = req.body;
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            };

            const isPasswordValid = await bcrypt.compare(senha, user.senha);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Senha inválida' });
            };

            const token = jwt.sign({ id: user.id }, "drypzz", { expiresIn: '1h' });

            res.json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao autenticar usuário', error });
        };
    };

    // Registro de novo usuário
    static async register(req, res) {
        try {
            const { nome, email, senha } = req.body;
            
            if (!nome || !email || !senha) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
            };
            
            const hashedPassword = await bcrypt.hash(senha, 10);
            const newUser = await User.create({ nome, email, senha: hashedPassword });

            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao registrar usuário', error });
            console.error(error);
        };
    };

    // Autenticação de token
    static validateToken(req, res, next) {
        const token = req.headers.authorization;
    
        if (!token) {
            return res.status(401).json({ message: "Acesso negado!" });
        };
    
        try {
            const decoded = jwt.verify(token.split(" ")[1], "drypzz");
            req.userId = decoded.id;
            next();
        } catch (error) {
            res.status(403).json({ message: "Token inválido!" });
        };
    };
};

module.exports = UserController;
