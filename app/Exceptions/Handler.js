'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

class ExceptionHandler extends BaseExceptionHandler {
  async handle (error, { request, response }) {
    if (error.name === 'ValidationException') {
      return response.status(error.status).send(error.message)
    }
    response.status(error.status).send(error.message)
  }

  async report (error, { request }) {}
}

module.exports = ExceptionHandler
