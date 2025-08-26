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
const opportunity_schema_1 = require("../../src/models/opportunity-schema");
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
const fieldEngineering_1 = require("../../src/domain/enums/fieldEngineering");
const typeJob_1 = require("../../src/domain/enums/typeJob");
describe("OpportunityModel", () => {
    let mongoServer;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        yield mongoose_1.default.connect(uri);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoServer.stop();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield opportunity_schema_1.OpportunityModel.deleteMany({});
    }));
    it("deve salvar uma oportunidade válida", () => __awaiter(void 0, void 0, void 0, function* () {
        const opportunityData = {
            title: "Engenheiro Civil",
            description: "Vaga de engenheiro civil",
            typeEngineering: fieldEngineering_1.FieldEngineering.Civil,
            typeJob: typeJob_1.TypeJob.TRAINEE,
            jobLocation: "São Paulo - SP",
            link: "http://vaga.com/123"
        };
        const opportunity = new opportunity_schema_1.OpportunityModel(opportunityData);
        const saved = yield opportunity.save();
        expect(saved._id).toBeDefined();
        expect(saved.title).toBe(opportunityData.title);
        expect(saved.typeEngineering).toBe(opportunityData.typeEngineering);
        expect(saved.typeJob).toBe(opportunityData.typeJob);
    }));
    it("não deve salvar uma oportunidade sem campos obrigatórios", () => __awaiter(void 0, void 0, void 0, function* () {
        const opportunityData = {
            description: "Sem título e tipo de trabalho",
            jobLocation: "São Paulo - SP",
            link: "http://vaga.com/456"
        };
        const opportunity = new opportunity_schema_1.OpportunityModel(opportunityData);
        yield expect(opportunity.save()).rejects.toThrow();
    }));
    it("não deve salvar com valores inválidos de enum", () => __awaiter(void 0, void 0, void 0, function* () {
        const opportunityData = {
            title: "Engenheiro Mecânico",
            description: "Vaga de engenheiro mecânico",
            typeEngineering: "Invalido",
            typeJob: "CLT",
            link: "http://vaga.com/789"
        };
        const opportunity = new opportunity_schema_1.OpportunityModel(opportunityData);
        yield expect(opportunity.save()).rejects.toThrow();
    }));
});
