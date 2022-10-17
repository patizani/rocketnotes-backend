const { Router, response } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const UsersController = require('../controllers/UsersController')
const UserAvatarController = require('../controllers/UserAvatarController')
const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const usersRoutes = Router()
const upload = multer(uploadConfig.MULTER)

function myMiddleware(request, response, next) {
  console.log('você passou pelo Middleware')
  next() //chama a função de criar o usuário.
}

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

usersRoutes.post('/', myMiddleware, usersController.create)
usersRoutes.put('/', ensureAuthenticated, usersController.update) //usuário precisa estar autenticado. Dentro do middleware de autenticação será capturado qual é o id do usuário que está dentro do token de autenticação (no sub, conteúdo do token). Então não precisa informar mais o :id

usersRoutes.get('/', ensureAuthenticated, usersController.select)
//não salvar o arquivo de imagem no banco de dados. Se guarda numa parte e no banco de dados o endereço de referência.
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
)

module.exports = usersRoutes //exportar o arquivo
