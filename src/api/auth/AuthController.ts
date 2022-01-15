import { Context } from 'koa'
import authService from './AuthService'
class AuthController {
  public async signUp(ctx: Context) {
    const { email, password } = ctx.request.body
    const result = await authService.signUp(email, password)

    return (ctx.body = result)
  }

  public async login(ctx: Context) {
    const { email, password } = ctx.request.body
    const result = await authService.login(email, password)
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

export default new AuthController()
