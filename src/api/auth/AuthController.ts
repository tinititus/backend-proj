import { Context } from 'koa'
import { AuthService } from './AuthService'
class AuthController {
  private static instance: AuthController

  static getInstance() {
    if (this.instance) {
      return this.instance
    }
    this.instance = new AuthController()
    return this.instance
  }

  public async signUp(ctx: Context) {
    const { email, password } = ctx.request.body
    const service = AuthService.getInstance()
    const result = await service.signUp(email, password)

    return (ctx.body = result)
  }

  public async login(ctx: Context) {
    const { email, password } = ctx.request.body
    const service = AuthService.getInstance()
    const result = await service.login(email, password)
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

export { AuthController }
