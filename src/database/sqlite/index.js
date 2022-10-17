const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const path = require("path"); //para rodar a aplicação de acordo com o ambiente.

//função assíncrona para que o arquivo seja criado de forma automática, caso não existir.
async function sqliteConnection() {//abrir uma conexão
  const database = await sqlite.open({
  filename: path.resolve(__dirname, "..", "database.db"),//aonde será salvo o arquivo.
  driver: sqlite3.Database//drive de conexão com a base de dados
});

  return database
}

module.exports = sqliteConnection