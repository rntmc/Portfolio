exports.up = knex => knex.schema.createTable("links", table => { // up: criar tabela
  table.increments("id");
  table.text("url").notNullable();// n pode ser nulo

  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE"); // Deleta as tags deletadas as notas em cascata
  table.timestamp("created_at").default(knex.fn.now());
});
 
exports.down = knex => knex.schema.dropTable("links"); //down: deletar tabela
