const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");
const authConfig = require("../configs/auth"); //configs na pasta configs/auth
const {sign} = require ("jsonwebtoken") // metodo do JWT

class SessionsController {
  async create(request, response) {
    const { email, password} = request.body;

    const user = await knex("users").where({email}).first();

    if(!user) { //se usuario existe
      throw new AppError("Email e/ou senha incorreta", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched){ //se senha eh correta
      throw new AppError("E-mail e/ou senha incorreta", 401)
    }

    //Passando essas verficacoes, o usuario esta ok

    const { secret, expiresIn} = authConfig.jwt;
    const token = sign({}, secret, { 
      subject: String(user.id), //conteudo no token(id do usuario)
      expiresIn
    })

    return response.json({user, token})
  }
}

module.exports = SessionsController;