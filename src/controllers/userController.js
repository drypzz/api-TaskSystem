const User = require("../models/user");
const Task = require("../models/task");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

class UserController {
    
    // Exibir todos os usuários
    static async getUsers(req, res) {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: "❌ Erro ao buscar usuários", error });
        };
    };

    // Exibir um usuário específico pelo ID
    static async getUserByID(req, res) {
        try {
            const id = Number(req.params.id);
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: "❌ Usuário não encontrado" });
            }

            res.json(user);
        } catch (error) {
            res.status(500).json({ message: "❌ Erro ao buscar usuário", error });
        };
    };

    // Criar um novo usuário
    static async createUser(req, res) {
        try {
            const { nome, email, senha } = req.body;

            if (!nome || !email || !senha) {
                return res.status(400).json({ message: "❌ Todos os campos são obrigatórios" });
            };

            const findEmail = await User.findOne({ where: { email } });
            if (findEmail) {
                return res.status(400).json({ message: "❌ Email já cadastrado" });
            };
            
            const hashedPassword = await bcrypt.hash(senha, 10);
            const newUser = await User.create({ nome, email, senha: hashedPassword });

            res.status(201).json({ message: "✅ Usuário criado com sucesso", newUser });
        } catch (error) {
            res.status(500).json({ message: "❌ Erro ao criar usuário", error });
        };
    };

    // Atualizar um usuário existente
    static async updateUser(req, res) {
        try {
            const id = Number(req.params.id);
            const { nome, email, senha } = req.body;
    
            const user = await User.findByPk(id);
    
            if (!user) {
                return res.status(404).json({ message: "❌ Usuário não encontrado" });
            };
    
            if (nome) user.nome = nome;
            if (email) user.email = email;
            if (senha) {
                user.senha = await bcrypt.hash(senha, 10);
            };
    
            await user.save();
    
            return res.status(200).json({ message: "✅ Usuário atualizado com sucesso", user });
        } catch (error) {
            return res.status(500).json({ message: "❌ Erro ao atualizar usuário", error });
        };
    };

    // Deletar um usuário
    static async deleteUser(req, res) {
        try {
            const id = Number(req.params.id);
    
            if (req.userId === id) {
                return res.status(403).json({ message: "❌ Você não pode deletar sua própria conta!" });
            };
    
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "❌ Usuário não encontrado" });
            };
    
            const tarefas = await Task.findAll({ where: { idUser: id } });
    
            if (tarefas.length > 0) {
                await Task.destroy({ where: { idUser: id } });
            };
    
            await user.destroy();
    
            res.json({ message: `✅ Usuário deletado com sucesso${tarefas.length > 0 ? ` junto com suas ${tarefas.length} tarefas atribuídas` : ""}`});
        } catch (error) {
            res.status(500).json({ message: "❌ Erro ao deletar usuário", error });
        };
    };

    // Autenticação de login
    static async loginUser(req, res) {
        try {
            const { email, senha } = req.body;
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(404).json({ message: "❌ Usuário não encontrado" });
            };

            const isPasswordValid = await bcrypt.compare(senha, user.senha);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "❌ Senha inválida" });
            };

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY || "drypzz", { expiresIn: "1h" });

            res.json({ message: "✅ Login realizado com sucesso", token });
        } catch (error) {
            res.status(500).json({ message: "❌ Erro ao autenticar usuário", error });
        };
    };

    // Autenticação de token
    static validateToken(req, res, next) {
        const token = req.headers.authorization;
    
        if (!token) {
            return res.status(401).json({ message: "❌ Acesso negado!" });
        };
    
        try {
            const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY || "drypzz");
            req.userId = decoded.id;
            next();
        } catch (error) {
            res.status(403).json({ message: "❌ Token inválido!" });
        };
    };
};

module.exports = UserController;
