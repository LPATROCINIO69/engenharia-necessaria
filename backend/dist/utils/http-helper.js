"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.created = exports.invalidCredentials = exports.userAlreadyExists = exports.badRequest = exports.noContent = exports.ok = void 0;
const ok = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return { statusCode: 200, body: data };
});
exports.ok = ok;
const noContent = () => __awaiter(void 0, void 0, void 0, function* () {
    return { statusCode: 204, body: null };
});
exports.noContent = noContent;
const badRequest = () => __awaiter(void 0, void 0, void 0, function* () {
    return { statusCode: 400, body: null };
});
exports.badRequest = badRequest;
const userAlreadyExists = () => __awaiter(void 0, void 0, void 0, function* () {
    return { statusCode: 400, body: { message: "User already exists" } };
});
exports.userAlreadyExists = userAlreadyExists;
const invalidCredentials = () => __awaiter(void 0, void 0, void 0, function* () {
    return { statusCode: 401, body: { message: "Invalid credentials" } };
});
exports.invalidCredentials = invalidCredentials;
const created = () => __awaiter(void 0, void 0, void 0, function* () {
    return { statusCode: 201, body: { message: "successful" } };
});
exports.created = created;
const serverError = () => __awaiter(void 0, void 0, void 0, function* () {
    return { statusCode: 500, body: { message: "Error inserting record into the database" } };
});
exports.serverError = serverError;
