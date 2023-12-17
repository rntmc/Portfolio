
exports.up = knex => knex.schema.createTable("notes", table => { // up: criar tabela
  table.increments("id");
  table.text("title");
  table.text("description");
  table.integer("user_id").references("id").inTable("users"); // user_id faz referencia ao id que existe na tabela users

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});
 
exports.down = knex => knex.schema.dropTable("notes"); //down: deletar tabela

