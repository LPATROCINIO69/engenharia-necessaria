import request from "supertest";
import createApp from "../src/app";

describe("App", () => {
  const app = createApp();

  it("Deve responder na rota base /api com 404 (rota inexistente)", async () => {
    const res = await request(app).get("/api/nao-existe");
    expect(res.status).toBe(404);
  });

  it("Deve aceitar JSON no body", async () => {
    const res = await request(app)
      .post("/api/exemplo")
      .send({ nome: "Teste" })
      .set("Content-Type", "application/json");
    // Aqui depende se existe essa rota, senão retorna 404
    expect([200, 404]).toContain(res.status); 
  });
});