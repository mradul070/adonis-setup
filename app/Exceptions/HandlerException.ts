/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import httpContstants from 'App/constants/httpContstants'
import errorMessage from 'App/constants/errorMessage'

class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error, ctx: HttpContextContract) {
    if (error.code === 'E_VALIDATION_FAILURE') {
      return ctx.response.status(httpContstants.HTTP_UNPROCESSABLE_ENTITY).json({ message: error.messages.errors })
    } else if (error.code === 'E_INVALID_AUTH_UID') {
      return ctx.response.status(httpContstants.HTTP_BAD_REQUEST).json({ message: errorMessage.WRONG_EMAIL_ADDRESS })
    } else if (error.code === 'E_INVALID_AUTH_PASSWORD') {
      return ctx.response.status(httpContstants.HTTP_BAD_REQUEST).json({ message: errorMessage.WRONG_AUTHENTICATION_PASSWORD })
    } else if (error.code === 'E_UNAUTHORIZED_ACCESS') {
      return ctx.response.status(httpContstants.HTTP_UNAUTHORISED).json({ message: errorMessage.UNAUTHORIZED })
    } else {
      ctx.response.status(500).send({ message: error.message })
    }
  }
}

let exceptionHandler: ExceptionHandler = new ExceptionHandler()
export default exceptionHandler
