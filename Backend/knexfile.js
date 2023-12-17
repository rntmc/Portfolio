const path = require('path');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)//funcionalidade para quando deletar uma nota, ele deletara em cascata quando necessario
    },
    migrations: { //Automatizar a criacao de tabelas na aplicacao
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },
    useNullAsDefault: true //Add essa propriedade pois eh um padrao
  },
};
