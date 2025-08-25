import * as HttpHelper from "../../src/utils/http-helper";

describe("HttpHelper", () => {

  it("ok() deve retornar status 200 com body", async () => {
    const data = { message: "Teste" };
    const result = await HttpHelper.ok(data);
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(data);
  });

  it("noContent() deve retornar status 204", async () => {
    const result = await HttpHelper.noContent();
    expect(result.statusCode).toBe(204);
    expect(result.body).toBeNull();
  });

  it("badRequest() deve retornar status 400", async () => {
    const result = await HttpHelper.badRequest();
    expect(result.statusCode).toBe(400);
    expect(result.body).toBeNull();
  });

  it("userAlreadyExists() deve retornar status 400 com mensagem apropriada", async () => {
    const result = await HttpHelper.userAlreadyExists();
    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual({ message: "User already exists" });
  });

  it("invalidCredentials() deve retornar status 401 com mensagem apropriada", async () => {
    const result = await HttpHelper.invalidCredentials();
    expect(result.statusCode).toBe(401);
    expect(result.body).toEqual({ message: "Invalid credentials" });
  });

  it("created() deve retornar status 201 com mensagem de sucesso", async () => {
    const result = await HttpHelper.created();
    expect(result.statusCode).toBe(201);
    expect(result.body).toEqual({ message: "successful" });
  });

  it("serverError() deve retornar status 500 com mensagem de erro", async () => {
    const result = await HttpHelper.serverError();
    expect(result.statusCode).toBe(500);
    expect(result.body).toEqual({ message: "Error inserting record into the database" });
  });

});
