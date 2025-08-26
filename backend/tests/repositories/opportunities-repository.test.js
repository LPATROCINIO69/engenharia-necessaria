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
const opportunities_repository_1 = require("../../src/repositories/opportunities-repository");
const opportunity_schema_1 = require("../../src/models/opportunity-schema");
jest.mock("../../src/models/opportunity-schema"); // mocka o mongoose model
describe("OpportunityRepository", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe("findAllOpportunities", () => {
        it("deve retornar todas as oportunidades sem filtros", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockData = [{ title: "Dev" }, { title: "Engenheiro" }];
            opportunity_schema_1.OpportunityModel.find.mockResolvedValue(mockData);
            const result = yield (0, opportunities_repository_1.findAllOpportunities)();
            expect(opportunity_schema_1.OpportunityModel.find).toHaveBeenCalledWith({});
            expect(result).toEqual(mockData);
        }));
        it("deve aplicar filtros corretamente", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockData = [{ title: "Dev remoto" }];
            opportunity_schema_1.OpportunityModel.find.mockResolvedValue(mockData);
            const result = yield (0, opportunities_repository_1.findAllOpportunities)("trainee", "Civil", "São Paulo - SP");
            expect(opportunity_schema_1.OpportunityModel.find).toHaveBeenCalledWith({
                typeJob: "trainee",
                typeEngineering: "Civil",
                jobLocation: "São Paulo - SP",
            });
            expect(result).toEqual(mockData);
        }));
    });
    describe("insertOpportunity", () => {
        it("deve criar uma nova oportunidade", () => __awaiter(void 0, void 0, void 0, function* () {
            const opportunityData = { title: "Backend Dev",
                description: "teste",
                typeEngineering: "Mecanica",
                typeJob: "trainee",
                jobLocation: "São Paulo - SP",
                requirements: "Qualquer",
                benefits: "todos",
                responsabilities: "nenhuma",
                link: "http://www.google.com.br"
            };
            const mockCreated = Object.assign({ id: "123" }, opportunityData);
            opportunity_schema_1.OpportunityModel.create.mockResolvedValue(mockCreated);
            const result = yield (0, opportunities_repository_1.insertOpportunity)(opportunityData);
            expect(opportunity_schema_1.OpportunityModel.create).toHaveBeenCalledWith(opportunityData);
            expect(result).toEqual(mockCreated);
        }));
    });
});
