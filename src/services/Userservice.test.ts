import { User, UserInstance } from "../models/User";
import * as UserService from "./Userservice";

describe("Testando User service", () => {
  //caixa grande que dentro dessa caixa tem caixas menores, que no caso são os testes

  let email = "teste@jest.com";
  let password = "1234";

  //faz a sincronização entre a estrutura do model e o que está no banco de dados
  //se não existir, ele cria, se existir o "force", faz com que ele delete, e cria uma nova
  beforeAll(async () => {
    await User.sync({ force: true });
  });


  it("Deve criar um novo usuário: ", async () => {
    const newUser = (await UserService.createUser(
      email,
      password
    )) as UserInstance;
    expect(newUser).not.toBeInstanceOf(Error);
    expect(newUser).toHaveProperty("id");
    expect(newUser.email).toBe(email);
  });
  it("Deve criar um usuario com o email existente", async () => {
    const newUser = (await UserService.createUser(
      email,
      password
    )) as UserInstance;
    expect(newUser).toBeInstanceOf(Error);
  });

  it("deve encontrar um usuario pelo email", async () => {
    const user = (await UserService.findByEmail(email)) as UserInstance;
    expect(user.email).toBe(email);
  });
  it("Deve combinar com a senha do banco de dados", async () => {
    const user = (await UserService.findByEmail(email)) as UserInstance;
    const match = await UserService.matchPassword("invalid", user.password);
    expect(match).toBeFalsy();
  });
  it("Deve retornar uma list de usuarios", async () => {
    const users = await UserService.all();
    expect(users.length).toBeGreaterThanOrEqual(1);
    for(let i in users){
        expect(users[i]).toBeInstanceOf(User)
    }
  });
});
