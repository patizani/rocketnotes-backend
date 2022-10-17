const path = require('path')

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'database.db')
    },
    pool: {
      afterCreate: (conn, cb) => {
        conn.run('PRAGMA foreign_keys = ON', cb)
      } //a funcionalidade em cascata é desabilitada por padrão no SQlite. Então habilita.
    },
    useNullAsDefault: true, //Essa é uma configuração para tratar queries de inserção de dados em que você não tenha definido um valor e é específica para atender a uma exigência do SQL.
    migrations: {
      //onde o knex vai armazenar as informações.
      directory: path.resolve(
        __dirname,
        'src',
        'database',
        'knex',
        'migrations'
      )
    }
  }
}
