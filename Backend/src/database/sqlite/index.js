const sqlite3 = require("sqlite3"); //drive que utilizaremos(versao)
const sqlite = require("sqlite"); //drive responsavel por conectar
const path = require("path") // biblioteca do Node: Resolve o endereco de acordo com o endereco

async function sqliteConnection() {
  const database = await sqlite.open({ //abrir uma conexao
    filename: path.resolve(__dirname,"..","database.db"), //indicando onde o arquivo ficara salvo
    driver: sqlite3.Database // informa qual db sera utilizada
  })
  return database;
}

module.exports = sqliteConnection;