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
Object.defineProperty(exports, "__esModule", { value: true });
const HttpHelper = __importStar(require("../../src/utils/http-helper"));
describe("HttpHelper", () => {
    it("ok() deve retornar status 200 com body", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { message: "Teste" };
        const result = yield HttpHelper.ok(data);
        expect(result.statusCode).toBe(200);
        expect(result.body).toEqual(data);
    }));
    it("noContent() deve retornar status 204", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield HttpHelper.noContent();
        expect(result.statusCode).toBe(204);
        expect(result.body).toBeNull();
    }));
    it("badRequest() deve retornar status 400", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield HttpHelper.badRequest();
        expect(result.statusCode).toBe(400);
        expect(result.body).toBeNull();
    }));
    it("userAlreadyExists() deve retornar status 400 com mensagem apropriada", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield HttpHelper.userAlreadyExists();
        expect(result.statusCode).toBe(400);
        expect(result.body).toEqual({ message: "User already exists" });
    }));
    it("invalidCredentials() deve retornar status 401 com mensagem apropriada", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield HttpHelper.invalidCredentials();
        expect(result.statusCode).toBe(401);
        expect(result.body).toEqual({ message: "Invalid credentials" });
    }));
    it("created() deve retornar status 201 com mensagem de sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield HttpHelper.created();
        expect(result.statusCode).toBe(201);
        expect(result.body).toEqual({ message: "successful" });
    }));
    it("serverError() deve retornar status 500 com mensagem de erro", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield HttpHelper.serverError();
        expect(result.statusCode).toBe(500);
        expect(result.body).toEqual({ message: "Error inserting record into the database" });
    }));
});
