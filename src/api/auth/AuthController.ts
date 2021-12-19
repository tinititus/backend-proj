import { Context } from 'koa'
import { LoginService, SignupService } from './AuthService'

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
    const { userId } = result

    if (userId) {
      ctx.cookies.set('isAuth', 'true', {
        expires: new Date(Date.now() + 3600 * 1000),
      })
      ctx.cookies.set('userId', `${userId}`)
    }

    return (ctx.body = { message: result.message })
  }
}

export { SignupController, LoginController }
