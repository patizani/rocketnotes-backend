const { Router } = require("express");

const SessionsControler = require("../controllers/SessionsControler");
const sessionsControler = new SessionsControler(); //instanciar com o new para alocando a classe na memória e transferindo na constante SessionsControler.

const sessionsRoutes = Router();
sessionsRoutes.post("/", sessionsControler.create);

module.exports = sessionsRoutes;



