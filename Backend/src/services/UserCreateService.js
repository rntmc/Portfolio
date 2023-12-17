const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError");

class UserCreateService {
  constructor(userRepository){
    this.userRepository = userRepository
  }

  async execute(name, email, password) {

    const checkUserExists = await this.userRepository.findByEmail(email)

    if(checkUserExists) {
      throw new AppError("Este email ja esta em uso")
    }

    const hashedPassword = await hash(password, 8); //criptogradar a senha e fator de complexidade = 8. Precisa do Await pois Hash eh uma promise

    const userCreated = await this.userRepository.create(name, email, hashedPassword);

    return userCreated;
  }
}

module.exports = UserCreateService;