import { getOpportunities, postOpportunity } from "../../src/controllers/opportunities-controllers";
import * as opportunityService from "../../src/services/opportunities-service";

// Mocka os serviços
jest.mock("../../src/services/opportunities-service");

describe("Opportunities Controller", () => {
  let req: any;
  let res: any;

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
    it("deve chamar o service com os parâmetros corretos e retornar a resposta", async () => {
      // mock do service
      (opportunityService.getOpportunitiesService as jest.Mock).mockResolvedValue({
        statusCode: 200,
        body: [{ id: 1, name: "vaga teste" }]
      });

      // adiciona query params
      req.query = { typeJob: "estagio", typeEngineering: "Civil", jobLocation: "SP" };

      await getOpportunities(req, res);

      expect(opportunityService.getOpportunitiesService).toHaveBeenCalledWith("estagio", "Civil", "SP");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ id: 1, name: "vaga teste" }]);
    });
  });

  describe("postOpportunity", () => {
    it("deve chamar o service com o body correto e retornar a resposta", async () => {
      (opportunityService.createOpportunityService as jest.Mock).mockResolvedValue({
        statusCode: 201,
        body: { id: 1, name: "vaga criada" }
      });

      req.body = { name: "vaga criada" };

      await postOpportunity(req, res);

      expect(opportunityService.createOpportunityService).toHaveBeenCalledWith({ name: "vaga criada" });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, name: "vaga criada" });
    });
  });
});