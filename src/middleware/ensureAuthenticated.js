const { verify } = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const authConfig = require('../configs/auth');

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization; //o token do usuário estará dentro desse caminho

  console.log({ authHeader })
  if (!authHeader) {
    throw new AppError('JWT Token não informado', 401)
  }

  const [, token] = authHeader.split(" ");//quebrando o texto num array. Ex."Bare xxxxxxxxx"
  console.log({ token, secret: authConfig.jwt.secret })

  try {
    const { sub: user_id} =  verify(token, authConfig.jwt.secret); //verificar se é um token válido.

    request.user = {
      id: Number(user_id),
    };

    return next(); //chamar a função destino.
  } catch (err) {
    console.log(err)
    throw new AppError('JWT Token Inválido', 401)
  }
}

module.exports = ensureAuthenticated;
