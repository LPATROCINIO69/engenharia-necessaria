import { findAllOpportunities, insertOpportunity } from "../../src/repositories/opportunities-repository";
import { OpportunityModel } from "../../src/models/opportunity-schema";

jest.mock("../../src/models/opportunity-schema"); // mocka o mongoose model

describe("OpportunityRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("findAllOpportunities", () => {
    it("deve retornar todas as oportunidades sem filtros", async () => {
      const mockData = [{ title: "Dev" }, { title: "Engenheiro" }];
      (OpportunityModel.find as jest.Mock).mockResolvedValue(mockData);

      const result = await findAllOpportunities();

      expect(OpportunityModel.find).toHaveBeenCalledWith({});
      expect(result).toEqual(mockData);
    });

    it("deve aplicar filtros corretamente", async () => {
      const mockData = [{ title: "Dev remoto" }];
      (OpportunityModel.find as jest.Mock).mockResolvedValue(mockData);

      const result = await findAllOpportunities("trainee", "Civil", "São Paulo - SP");

      expect(OpportunityModel.find).toHaveBeenCalledWith({
        typeJob: "trainee",
        typeEngineering: "Civil",
        jobLocation: "São Paulo - SP",
      });
      expect(result).toEqual(mockData);
    });
  });

  describe("insertOpportunity", () => {
    it("deve criar uma nova oportunidade", async () => {
      const opportunityData = { title: "Backend Dev",
                        description:"teste",
                        typeEngineering:"Mecanica",
                        typeJob:"trainee",
                        jobLocation:"São Paulo - SP",
                        requirements:"Qualquer",
                        benefits:"todos",
                        responsabilities:"nenhuma",
                        link:"http://www.google.com.br"
       };
      const mockCreated = { id: "123", ...opportunityData };

      (OpportunityModel.create as jest.Mock).mockResolvedValue(mockCreated);

      const result = await insertOpportunity(opportunityData as any);

      expect(OpportunityModel.create).toHaveBeenCalledWith(opportunityData);
      expect(result).toEqual(mockCreated);
    });
  });
});
