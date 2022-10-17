//Padronizar o tipo de mensagem quando ocorrer erro.
class AppError {
  message;
  statusCode;

  constructor(message, statusCode = 400) {//método que é carregado automaticamente quando a classe é instanciada.
    this.message = message; // repassando a message que chegou no constructor e repassando para o message que faz parte do contexto global.
    this.statusCode = statusCode;
  }
}

module.exports = AppError;