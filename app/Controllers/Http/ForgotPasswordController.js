'use strict'

const crypto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')

class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save()

      return response.send({ token: user.token })

    //   await Mail.send(
    //     ['emails.forgot_password'],
    //     { email, token: user.token },
    //     message => {
    //       message
    //         .to(user.email)
    //         .from('gonode@gonode.com', 'Renan | GoNode')
    //         .subject('Recuperação de senha')
    //     })
    } catch (err) {
      return response.status(err.status).send({ error: { message: 'Algo não deu certo, e-mail não existente' } })
    }
  }

  async update ({ request, response }) {
    try {

    } catch (err) {
      return response.status(err.status).send({ error: { message: 'Algo não deu certo ao resetar sua senha' } })
    }
  }
}

module.exports = ForgotPasswordController
