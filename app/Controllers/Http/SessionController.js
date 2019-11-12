'use strict'

class SessionController {
  async store ({ request, resopnse, auth }) {
    const { email, password } = request.all()

    const token = await auth.attempt(email, password)

    return token
  }
}

module.exports = SessionController
