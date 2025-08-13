import { Request, Response } from "express";
import * as HttpResponse from '../utils/http-helper';

const User = require('../models/user-schema');
const jwt = require('jsonwebtoken');

// insere o login/senha no banco de dados
exports.register = async (req: Request, res: Response) => {

    try {

        const { name, email, password } = req.body;

        // Validações básicas
        if (!name || !email || !password) {
            return await HttpResponse.badRequest();
        }

        // verifica se o usuario já existe
        if (await User.findOne({ email })) {
            return await HttpResponse.userAlreadyExists();
        }

        const user = await User.create({ name, email, password });

        // não retornar a senha
        user.password = undefined;

        // Gerar token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        return await HttpResponse.created();


    } catch (err) {
        return await HttpResponse.badRequest();
    }
}

// valida o login/senha
exports.login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return await HttpResponse.badRequest();
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return await HttpResponse.invalidCredentials();
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return await HttpResponse.invalidCredentials();
        }

        // Gerar token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        user.password = undefined;

        return res.json({
            user: {
                _id:    user._id,
                name:   user.name,
                email:  user.email,
                created: user.createdAt
            },
            token
        });

    } catch (err) {
        console.error("Login error: ", err);
        return await HttpResponse.serverError();
    }
}