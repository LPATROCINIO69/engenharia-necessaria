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
const mongoose_1 = __importDefault(require("mongoose"));
const axios_1 = __importDefault(require("axios"));
const joblocation_schema_1 = __importDefault(require("../models/joblocation-schema"));
function fetchCidadesDoIBGE() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "https://servicodados.ibge.gov.br/api/v1/localidades/municipios";
        const { data } = yield axios_1.default.get(url);
        // Normalizar dados no formato { cidade, estado, codigoIbge }
        return data
            .map((m) => {
            var _a, _b, _c;
            const estado = (_c = (_b = (_a = m === null || m === void 0 ? void 0 : m.microrregiao) === null || _a === void 0 ? void 0 : _a.mesorregiao) === null || _b === void 0 ? void 0 : _b.UF) === null || _c === void 0 ? void 0 : _c.sigla;
            return estado
                ? {
                    cidade: m.nome,
                    estado,
                    codigoIbge: m.id
                }
                : null;
        })
            .filter(Boolean); // remove nulls
    });
}
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect("mongodb://localhost:27017/engenhariaopportunity"); // troque seu banco
            console.log("✅ Conectado ao MongoDB");
            console.log("📡 Baixando lista de cidades do IBGE...");
            const listaCidades = yield fetchCidadesDoIBGE();
            console.log(`📌 Recebidas ${listaCidades.length} cidades`);
            yield joblocation_schema_1.default.deleteMany({});
            console.log("🗑️ Coleção 'joblocation' limpa");
            yield joblocation_schema_1.default.insertMany(listaCidades);
            console.log("✅ Seed concluído com sucesso!");
            yield mongoose_1.default.disconnect();
        }
        catch (err) {
            console.error("❌ Erro no seed:", err);
            mongoose_1.default.disconnect();
        }
    });
}
seed();
