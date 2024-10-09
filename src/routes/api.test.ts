import request from "supertest";
import app from "../app";
import { User } from "../models/User";

describe("Testes da API de Registro e Login", () => {
  let email = "test@jest.com";
  let password = "1234";

  beforeAll(async () => {
    await User.sync({ force: true });
  });


  it("não deve registrar um usuário sem a senha", async () => {
    const response = await request(app)
      .post("/register")
      .send(`email=${email}`);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("E-mail e/ou senha não enviados.");
  });


  it("não deve registrar um usuário sem o email", async () => {
    const response = await request(app)
      .post("/register")
      .send(`password=${password}`);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("E-mail e/ou senha não enviados.");
  });

  it("não deve registrar um usuário sem os dados", async () => {
    const response = await request(app)
      .post("/register")
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("E-mail e/ou senha não enviados.");
  });

  it("deve logar corretamente", async () => {
    await request(app)
      .post("/register")
      .send(`email=${email}&password=${password}`);

    const response = await request(app)
      .post("/login")
      .send(`email=${email}&password=${password}`);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
  });
});
