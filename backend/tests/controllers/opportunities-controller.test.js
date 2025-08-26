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
const opportunities_controllers_1 = require("../../src/controllers/opportunities-controllers");
const opportunityService = __importStar(require("../../src/services/opportunities-service"));
// Mocka os serviços
jest.mock("../../src/services/opportunities-service");
describe("Opportunities Controller", () => {
    let req;
    let res;
    beforeEach(() => {
        req = {
            query: {},
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });
    describe("getOpportunities", () => {
        it("deve chamar o service com os parâmetros corretos e retornar a resposta", () => __awaiter(void 0, void 0, void 0, function* () {
            // mock do service
            opportunityService.getOpportunitiesService.mockResolvedValue({
                statusCode: 200,
                body: [{ id: 1, name: "vaga teste" }]
            });
            // adiciona query params
            req.query = { typeJob: "estagio", typeEngineering: "Civil", jobLocation: "SP" };
            yield (0, opportunities_controllers_1.getOpportunities)(req, res);
            expect(opportunityService.getOpportunitiesService).toHaveBeenCalledWith("estagio", "Civil", "SP");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([{ id: 1, name: "vaga teste" }]);
        }));
    });
    describe("postOpportunity", () => {
        it("deve chamar o service com o body correto e retornar a resposta", () => __awaiter(void 0, void 0, void 0, function* () {
            opportunityService.createOpportunityService.mockResolvedValue({
                statusCode: 201,
                body: { id: 1, name: "vaga criada" }
            });
            req.body = { name: "vaga criada" };
            yield (0, opportunities_controllers_1.postOpportunity)(req, res);
            expect(opportunityService.createOpportunityService).toHaveBeenCalledWith({ name: "vaga criada" });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ id: 1, name: "vaga criada" });
        }));
    });
});
