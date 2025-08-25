import { OpportunityModel } from "../../src/models/opportunity-schema";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { FieldEngineering } from "../../src/domain/enums/fieldEngineering";
import { TypeJob } from "../../src/domain/enums/typeJob";

describe("OpportunityModel", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await OpportunityModel.deleteMany({});
  });

  it("deve salvar uma oportunidade válida", async () => {
    const opportunityData = {
      title: "Engenheiro Civil",
      description: "Vaga de engenheiro civil",
      typeEngineering: FieldEngineering.Civil,
      typeJob: TypeJob.TRAINEE,
      jobLocation: "São Paulo - SP",
      link: "http://vaga.com/123"
    };

    const opportunity = new OpportunityModel(opportunityData);
    const saved = await opportunity.save();

    expect(saved._id).toBeDefined();
    expect(saved.title).toBe(opportunityData.title);
    expect(saved.typeEngineering).toBe(opportunityData.typeEngineering);
    expect(saved.typeJob).toBe(opportunityData.typeJob);
  });

  it("não deve salvar uma oportunidade sem campos obrigatórios", async () => {
    const opportunityData = {
      description: "Sem título e tipo de trabalho",
      jobLocation: "São Paulo - SP",
      link: "http://vaga.com/456"
    };

    const opportunity = new OpportunityModel(opportunityData);

    await expect(opportunity.save()).rejects.toThrow();
  });

  it("não deve salvar com valores inválidos de enum", async () => {
    const opportunityData = {
      title: "Engenheiro Mecânico",
      description: "Vaga de engenheiro mecânico",
      typeEngineering: "Invalido",
      typeJob: "CLT",
      link: "http://vaga.com/789"
    };

    const opportunity = new OpportunityModel(opportunityData);

    await expect(opportunity.save()).rejects.toThrow();
  });
});
