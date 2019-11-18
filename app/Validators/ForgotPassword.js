'use strict'

class ForgotPassword {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'reqiored|email',
      redirect_url: 'required|url'
    }
  }
}

module.exports = ForgotPassword
