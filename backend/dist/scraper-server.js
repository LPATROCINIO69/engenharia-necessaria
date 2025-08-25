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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database_1 = require("./config/database");
const infojobs_controller_1 = require("./controllers/infojobs-controller");
function runScrapers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, database_1.connectDatabase)();
            console.log("🟢 Banco de dados conectado com sucesso!");
            // Execute os scrapers desejados
            const opportunities = yield (0, infojobs_controller_1.infojobsController)(); // coleta oportunidades de estágio e emprego para gravar no MongoDB
            console.log("✅ Scraping finalizado com sucesso.");
            process.exit(0);
        }
        catch (error) {
            console.error("❌ Erro ao executar scrapers:", error);
            process.exit(1);
        }
    });
}
runScrapers();
