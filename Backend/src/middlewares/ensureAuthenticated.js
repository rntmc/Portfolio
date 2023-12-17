const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if(!authHeader){
    throw new AppError("JWT token nao informado", 401);
  }

  const [, token] = authHeader.split(" "); //Bearer xxxxx (no vetor emitimos o "Bearer", deixando somente o token)

  try {
    const {sub: user_id} = verify(token, authConfig.jwt.secret); //verificar se eh um token valido. //acessar o verify pelo sub(conteudo armazenado) -> converte para user_id(alias)
  
    request.user = {
      id: Number(user_id)
    }

    return next();
  }catch {
    throw new AppError("JWT token invalido", 401);
  }
}

module.exports = ensureAuthenticated;