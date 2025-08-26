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
// tests/server.test.ts
const globals_1 = require("@jest/globals");
describe("Server", () => {
    let listenMock;
    let consoleSpy;
    beforeEach(() => {
        globals_1.jest.resetModules(); // limpa cache de módulos para aplicar mocks
        listenMock = globals_1.jest.fn();
        consoleSpy = globals_1.jest.spyOn(console, "error").mockImplementation(() => { });
    });
    afterEach(() => {
        globals_1.jest.clearAllMocks();
        consoleSpy.mockRestore();
    });
    it("Deve iniciar o servidor quando o banco conecta", () => __awaiter(void 0, void 0, void 0, function* () {
        const connectDatabaseMock = globals_1.jest.fn(() => __awaiter(void 0, void 0, void 0, function* () { }));
        globals_1.jest.doMock("../src/config/database", () => ({
            connectDatabase: connectDatabaseMock,
        }));
        globals_1.jest.doMock("../src/app", () => ({
            __esModule: true,
            default: () => ({ listen: listenMock }),
        }));
        // Importa após os mocks
        yield Promise.resolve().then(() => __importStar(require("../src/server")));
        expect(connectDatabaseMock).toHaveBeenCalled();
        expect(listenMock).toHaveBeenCalled();
    }));
    it("Deve logar erro se o banco falhar", () => __awaiter(void 0, void 0, void 0, function* () {
        const connectDatabaseMock = globals_1.jest.fn(() => __awaiter(void 0, void 0, void 0, function* () {
            throw new Error("DB error");
        }));
        globals_1.jest.doMock("../src/config/database", () => ({
            connectDatabase: connectDatabaseMock,
        }));
        globals_1.jest.doMock("../src/app", () => ({
            __esModule: true,
            default: () => ({ listen: listenMock }),
        }));
        yield Promise.resolve().then(() => __importStar(require("../src/server")));
        yield new Promise(process.nextTick); // <-- espera o catch do server ser chamado
        expect(connectDatabaseMock).toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Falha ao conectar ao banco de dados"), expect.any(Error));
    }));
});
