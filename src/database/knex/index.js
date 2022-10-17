//Configuração do knex com o banco de dados.
const config = require('../../../knexfile');
const knex = require('knex');

const connection = knex(config.development);

module.exports = connection;