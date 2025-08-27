"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
dotenv_1.default.config();
const app = (0, app_1.default)();
const port = parseInt(process.env.PORT || '8080', 10);
(0, database_1.connectDatabase)().then(() => {
    app.listen(port, '0.0.0.0', () => {
        console.log(`✅ Server rodando em ${port}`);
    });
}).catch((error) => {
    console.error("❌ Falha ao conectar ao banco de dados:", error);
});
