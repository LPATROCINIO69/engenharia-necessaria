import request from "supertest";
import express, { Express } from "express";
import routes from "../../src/routes/routes";
import * as opportunityService from "../../src/services/opportunities-service";
import * as authService from "../../src/services/auth-service"; // se houver


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

     }]

describe("Routes API", () => {
  let app: Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use("/api", routes);
  });

  afterEach(() => {
  jest.restoreAllMocks();
});

  describe("GET api/opportunities", () => {
    it("deve retornar 200 quando houver oportunidades", async () => {
      // mock do service
      const spy = jest.spyOn(opportunityService, "getOpportunitiesService").mockResolvedValue({
        statusCode: 200,
        body: data
      } as any);

      const res = await request(app).get("/api/opportunities");
      expect(spy).toHaveBeenCalled(); // garante que entrou no mock
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(data);
    });

    it("deve retornar 204 quando não houver oportunidades", async () => {
      const spy = jest.spyOn(opportunityService, "getOpportunitiesService").mockResolvedValue({
        statusCode: 204,
        body: null
      } as any);

      const res = await request(app).get("/api/opportunities");
      expect(spy).toHaveBeenCalled(); // garante que entrou no mock
      expect(res.statusCode).toBe(204);
      expect(res.body).toEqual({});
    });
  });

  describe("POST api/opportunities", () => {
    it("deve retornar 201 quando criar oportunidade válida", async () => {
      jest.spyOn(opportunityService, "createOpportunityService").mockResolvedValue({
        statusCode: 201,
        body: { message: "successful" }
      } as any);

      const res = await request(app)
        .post("/api/opportunities")
        .send({ title: "Nova vaga", typeJob: "trainee", typeEngineering: "Civil", link: "http://teste.com" });

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual({ message: "successful" });
    });
  });

  // adicionar testes para login, register e demais endpoints
});
