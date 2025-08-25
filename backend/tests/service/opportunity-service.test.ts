import { getOpportunitiesService, createOpportunityService } from "../../src/services/opportunities-service";
import * as opportunityRepo from "../../src/repositories/opportunities-repository";
import * as HttpResponse from "../../src/utils/http-helper";

jest.mock("../../src/repositories/opportunities-repository");
jest.mock("../../src/utils/http-helper");

describe("OpportunityService", () => {

  beforeEach(() => {
    jest.clearAllMocks(); // limpa mocks antes de cada teste
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
  jest.restoreAllMocks();
  });

  const data = [{ 
                        id: 1, 
                        title: "Engenheiro",
                        description:"teste",
                        typeEngineering:"Mecanica",
                        typeJob:"trainee",
                        jobLocation:"São Paulo - SP",
                        requirements:"Qualquer",
                        benefits:"todos",
                        responsabilities:"nenhuma",
                        link:"http://www.google.com.br"

     }];
  
  describe("getOpportunitiesService", () => {
    // teste 1
    it("Deve retornar 200 (ok) quando houver oportunidades", async () => {
      (opportunityRepo.findAllOpportunities as jest.Mock).mockResolvedValue(data);
      (HttpResponse.ok as jest.Mock).mockResolvedValue({ statusCode: 200, body:data });

      const result = await getOpportunitiesService();
      expect(HttpResponse.ok).toHaveBeenCalled();
      expect(result.statusCode).toBe(200);
    });
    // teste 2
    it("Deve retornar 204 (noContent) quando não houver oportunidades", async () => {
      (opportunityRepo.findAllOpportunities as jest.Mock).mockResolvedValue([]);
      (HttpResponse.noContent as jest.Mock).mockResolvedValue({ statusCode: 204 });

      const result = await getOpportunitiesService();
      expect(HttpResponse.noContent).toHaveBeenCalled();
      expect(result.statusCode).toBe(204);
    });
  });

  describe("createOpportunityService", () => {
    // teste 3
    it("Deve retornar 201 (created) quando a oportunidade for válida", async () => {
      const newOpp = { title: "Engenheiro" };
      (opportunityRepo.insertOpportunity as jest.Mock).mockResolvedValue(undefined);
      (HttpResponse.created as jest.Mock).mockResolvedValue({ statusCode: 201 });

      const result = await createOpportunityService(newOpp as any);
      expect(HttpResponse.created).toHaveBeenCalled();
      expect(result.statusCode).toBe(201);
    });
    // teste 4
    it("Deve retornar 400 (badRequest) quando a oportunidade for inválida", async () => {
      (HttpResponse.badRequest as jest.Mock).mockResolvedValue({ statusCode: 400 });

      const result = await createOpportunityService(null as any);
      expect(HttpResponse.badRequest).toHaveBeenCalled();
      expect(result.statusCode).toBe(400);
    });
    // teste 5
    it("Deve retornar 500 (serverError) quando ocorrer erro no insert", async () => {
      const newOpp = { title: "Engenheiro" };
      (opportunityRepo.insertOpportunity as jest.Mock).mockRejectedValue(new Error("Erro"));
      (HttpResponse.serverError as jest.Mock).mockResolvedValue({ statusCode: 500 });

      const result = await createOpportunityService(newOpp as any);
      expect(HttpResponse.serverError).toHaveBeenCalled();
      expect(result.statusCode).toBe(500);
    });
  });

});
