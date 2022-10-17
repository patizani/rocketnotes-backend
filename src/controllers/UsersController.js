//Arquivo que tem o controller que vai executar a requisição. O controller devolve para a rota que devolve para o server.
const { hash, compare } = require('bcryptjs')
const AppError = require('../utils/AppError')

const sqliteConnection = require('../database/sqlite')

class UsersController {
  /*
Criada uma class para que contenha várias funções.  
Camada que vai executar o que o usuário executou.
  index - GET para listar vários registros;
  show - GET para exibir um registro específico;
  create - POST para criar um registro;
  update - PUT para atualizar um registro;
  delete - DELETE para remover um registro.
*/

  async create(request, response) {
    const { name, email, password } = request.body

    const database = await sqliteConnection()

    const checkUseExists = await database.get(
      `SELECT * FROM users WHERE email = (?)`,
      [email]
    )

    if (checkUseExists) {
      throw new AppError('Este e-mail já está em uso.')
    }

    const hashedPassword = await hash(password, 8) //8 = fator de complexidade

    await database.run(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [name, email, hashedPassword]
    )

    return response.status(201).json()
    // if(!name) {
    //   throw new AppError("Nome é obrigatório!");
    // }

    // response.status(201).json({name, email, password});
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body
    // const {id} = request.params;
    const user_id = request.user.id

    const database = await sqliteConnection()
    const user = await database.get('SELECT * FROM users WHERE id = (?)', [
      user_id
    ])

    if (!user) {
      throw new AppError('Usuário não encontrado.')
    }

    const userWithUpdatedEmail = await database.get(
      `SELECT * FROM users WHERE email = (?)`,
      [email]
    )

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Esse e-mail já está em uso.')
    }
    user.name = name ?? user.name //Operador ??: Nullish coalescing operator
    user.email = email ?? user.email

    if (password && !old_password) {
      throw new AppError(
        'Você precisa informar a senha antiga para definir a nova senha.'
      )
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError('A senha antiga não confere.')
      }

      user.password = await hash(password, 8)
    }

    await database.run(
      `UPDATE users SET 
      name = ?, 
      email = ?, 
      password = ?,
      updated_at = DATETIME('now') 
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
    )

    return response.status(200).json()
  }

  async select(request, response) {

    const database = await sqliteConnection()
    const user = await database.all('SELECT * FROM users')

    return response.status(200).json(user)
  }
}

module.exports = UsersController
