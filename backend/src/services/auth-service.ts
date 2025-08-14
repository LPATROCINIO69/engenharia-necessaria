import * as HttpResponse from '../utils/http-helper';

import User from "../models/user-schema";
const jwt = require('jsonwebtoken');

export const createUserService = async (name: string, email: string, password: string) => {
    try {
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


export const validaUserService = async (email:string, password:string) => {
try {
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

        const data = {user: {
                _id:    user._id,
                name:   user.name,
                email:  user.email,
                created: user.createdAt
            },
            token
        };

        return await HttpResponse.ok(data);

    } catch (err) {
        console.error("Login error: ", err);
        return await HttpResponse.serverError();
    }
}