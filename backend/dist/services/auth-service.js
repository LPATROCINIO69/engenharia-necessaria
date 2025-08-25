"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validaUserService = exports.createUserService = void 0;
const HttpResponse = __importStar(require("../utils/http-helper"));
const user_schema_1 = __importDefault(require("../models/user-schema"));
const jwt = require('jsonwebtoken');
const createUserService = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validações básicas
        if (!name || !email || !password) {
            return yield HttpResponse.badRequest();
        }
        // verifica se o usuario já existe
        if (yield user_schema_1.default.findOne({ email })) {
            return yield HttpResponse.userAlreadyExists();
        }
        const user = yield user_schema_1.default.create({ name, email, password });
        // não retornar a senha
        user.password = undefined;
        // Gerar token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        return yield HttpResponse.created();
    }
    catch (err) {
        return yield HttpResponse.badRequest();
    }
});
exports.createUserService = createUserService;
const validaUserService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!email || !password) {
            return yield HttpResponse.badRequest();
        }
        const user = yield user_schema_1.default.findOne({ email }).select('+password');
        if (!user) {
            return yield HttpResponse.invalidCredentials();
        }
        const isMatch = yield user.comparePassword(password);
        if (!isMatch) {
            return yield HttpResponse.invalidCredentials();
        }
        // Gerar token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        user.password = undefined;
        const data = { user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                created: user.createdAt
            },
            token
        };
        return yield HttpResponse.ok(data);
    }
    catch (err) {
        console.error("Login error: ", err);
        return yield HttpResponse.serverError();
    }
});
exports.validaUserService = validaUserService;
