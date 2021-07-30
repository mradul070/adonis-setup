import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import httpContstants from 'App/constants/httpContstants'
import User from 'App/Models/User'

export default class UsersController {
  public async createUser(ctx: HttpContextContract) {
    try {
      let { firstName, lastName, email, password } = ctx.request.only([
        'firstName',
        'lastName',
        'email',
        'password',
      ])
      let user: User = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      })
      ctx.response.status(httpContstants.HTTP_SUCCESS_OK).json(user)
    } catch (error) {}
  }
}
