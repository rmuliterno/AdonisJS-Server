'use strict'

const moment = require('moment')
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
      const { token, password } = request.all()

      const user = await User.findByOrFail('token', token)

      const tokenExpired = moment().subtract('2', 'days').isAfter(user.token_created_at)

      if (tokenExpired) {
        return response.status(401).send({ error: { message: 'O token de recuperação está expirado' } })
      }

      user.token = null
      user.token_created_at = null
      user.password = password

      await user.save()
    } catch (err) {
      return response.status(err.status).send({ error: { message: 'Algo não deu certo ao resetar sua senha' } })
    }
  }
}

module.exports = ForgotPasswordController
