const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");

class SessionsControler {
  async create(request, response) {//função assíncrona pq vai envolver conexão com o BD, ou seja vai criar uma sessão para o usuário
    const { email, password } = request.body;

    const user = await knex("users").where({ email }).first(); //para garantir que traga apenas um usuário. 

    //Validar as credenciais de acesso
    if (!user) {
      throw new AppError("E-mail e/ou senha incorreta.", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorreta.", 401); //Repetir a mensagem da validação do e-mail para evitar invasores.
    }

    //Gerar um token para o usuário para usar esse token como uma chave para fazer as requisições já autenticadas na aplicação.
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })
    return response.json({ user, token });
  }
}

module.exports = SessionsControler;