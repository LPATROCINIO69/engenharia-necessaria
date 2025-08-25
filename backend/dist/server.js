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
const port = process.env.PORT || 3000;
(0, database_1.connectDatabase)().then(() => {
    app.listen(port, () => {
        console.log(`✅ Server rodando em http://localhost:${port}`);
    });
}).catch((error) => {
    console.error("❌ Falha ao conectar ao banco de dados:", error);
});
