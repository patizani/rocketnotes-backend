module.exports = {
  jwt: {
    secret: process.env.AUTH_SECRET || "default", //chave secreta para gerar o token jwt
    expiresIn: "1d",
  }
}