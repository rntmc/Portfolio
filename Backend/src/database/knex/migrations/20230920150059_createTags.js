exports.up = knex => knex.schema.createTable("tags", table => { // up: criar tabela
  table.increments("id");
  table.text("name").notNullable();// n pode ser nulo

  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE"); // Deleta as tags deletadas as notas em cascata
  table.integer("user_id").references("id").inTable("users");

});
 
exports.down = knex => knex.schema.dropTable("tags"); //down: deletar tabela