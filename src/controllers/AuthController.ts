import { Context } from 'koa'
import { LoginService, SignupService } from '../services/AuthService'

class SignupController {
  async handle(ctx: Context) {
    const { email, password } = ctx.request.body
    const service = new SignupService()
    const result = await service.execute(email, password)

    return (ctx.body = result)
  }
}

class LoginController {
  async handle(ctx: Context) {
    const { email, password } = ctx.request.body
    const service = new LoginService()
    const result = await service.execute(email, password)
    const { user } = result
    if (user) {
      ctx.cookies.set('isAuth', 'true', {
        expires: new Date(Date.now() + 3600 * 1000),
      })
    }
    return (ctx.body = result)
  }
}

export { SignupController, LoginController }
