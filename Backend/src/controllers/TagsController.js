const knex = require("../database/knex");

class TagsController {
  async index(request, response) { //funcao para listar todas as tags do usuario
    const user_id = request.user.id;

    const tags = await knex("tags")
    .where({user_id}) //nao precisa colocar {user_id: user_id} pois os campos possuem nomes iguais e o programa entende isso
    .groupBy("name") //remove duplicatas de tags na pagina Home(lado esquerdo)

    return response.json(tags);
  }
}

module.exports = TagsController;