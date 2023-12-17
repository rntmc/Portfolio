const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");

const AppError = require("../utils/AppError");

describe("UserCreateService", () => {
  let userRepositoryInMemory = null
  let userCreateService = null;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    userCreateService = new UserCreateService(userRepositoryInMemory);
  })

  
  it("user should be created", async () => {
    const user = {
      name: 'User Test',
      email: "user@test.com",
      password: "123"
    };

    const userCreated = await userCreateService.execute(user.name, user.email, user.password);
    expect(userCreated).toHaveProperty("id");
  });

  it("user should not be created with email already registered", async () => {
    const user1 = {
      name: "User test 1",
      email: "user@test.com",
      password: "123"
    };

    const user2 = {
      name: "User test 2",
      email: "user@test.com",
      password: "456"
    }

    await userCreateService.execute(user1.name, user1.email, user1.password);
    try {
      await userCreateService.execute(user2.name, user2.email, user2.password);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe("Este email ja esta em uso");
    }
    
  })
})
