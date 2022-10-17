const sqliteConnection = require('../../sqlite');

const createUsers = require('./createUsers');

async function migrationsRun(){
  const schemas = [
    createUsers
  ].join(''); //juntar todos os schemas com espaço.

  sqliteConnection()
  .then(db => db.exec(schemas))
  .catch(err => console.error(err));
}

module.exports = migrationsRun;