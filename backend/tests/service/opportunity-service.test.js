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
const opportunities_service_1 = require("../../src/services/opportunities-service");
const opportunityRepo = __importStar(require("../../src/repositories/opportunities-repository"));
const HttpResponse = __importStar(require("../../src/utils/http-helper"));
jest.mock("../../src/repositories/opportunities-repository");
jest.mock("../../src/utils/http-helper");
describe("OpportunityService", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // limpa mocks antes de cada teste
        jest.spyOn(console, "error").mockImplementation(() => { });
        jest.spyOn(console, "log").mockImplementation(() => { });
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    const data = [{
            id: 1,
            title: "Engenheiro",
            description: "teste",
            typeEngineering: "Mecanica",
            typeJob: "trainee",
            jobLocation: "São Paulo - SP",
            requirements: "Qualquer",
            benefits: "todos",
            responsabilities: "nenhuma",
            link: "http://www.google.com.br"
        }];
    describe("getOpportunitiesService", () => {
        // teste 1
        it("Deve retornar 200 (ok) quando houver oportunidades", () => __awaiter(void 0, void 0, void 0, function* () {
            opportunityRepo.findAllOpportunities.mockResolvedValue(data);
            HttpResponse.ok.mockResolvedValue({ statusCode: 200, body: data });
            const result = yield (0, opportunities_service_1.getOpportunitiesService)();
            expect(HttpResponse.ok).toHaveBeenCalled();
            expect(result.statusCode).toBe(200);
        }));
        // teste 2
        it("Deve retornar 204 (noContent) quando não houver oportunidades", () => __awaiter(void 0, void 0, void 0, function* () {
            opportunityRepo.findAllOpportunities.mockResolvedValue([]);
            HttpResponse.noContent.mockResolvedValue({ statusCode: 204 });
            const result = yield (0, opportunities_service_1.getOpportunitiesService)();
            expect(HttpResponse.noContent).toHaveBeenCalled();
            expect(result.statusCode).toBe(204);
        }));
    });
    describe("createOpportunityService", () => {
        // teste 3
        it("Deve retornar 201 (created) quando a oportunidade for válida", () => __awaiter(void 0, void 0, void 0, function* () {
            const newOpp = { title: "Engenheiro" };
            opportunityRepo.insertOpportunity.mockResolvedValue(undefined);
            HttpResponse.created.mockResolvedValue({ statusCode: 201 });
            const result = yield (0, opportunities_service_1.createOpportunityService)(newOpp);
            expect(HttpResponse.created).toHaveBeenCalled();
            expect(result.statusCode).toBe(201);
        }));
        // teste 4
        it("Deve retornar 400 (badRequest) quando a oportunidade for inválida", () => __awaiter(void 0, void 0, void 0, function* () {
            HttpResponse.badRequest.mockResolvedValue({ statusCode: 400 });
            const result = yield (0, opportunities_service_1.createOpportunityService)(null);
            expect(HttpResponse.badRequest).toHaveBeenCalled();
            expect(result.statusCode).toBe(400);
        }));
        // teste 5
        it("Deve retornar 500 (serverError) quando ocorrer erro no insert", () => __awaiter(void 0, void 0, void 0, function* () {
            const newOpp = { title: "Engenheiro" };
            opportunityRepo.insertOpportunity.mockRejectedValue(new Error("Erro"));
            HttpResponse.serverError.mockResolvedValue({ statusCode: 500 });
            const result = yield (0, opportunities_service_1.createOpportunityService)(newOpp);
            expect(HttpResponse.serverError).toHaveBeenCalled();
            expect(result.statusCode).toBe(500);
        }));
    });
});
