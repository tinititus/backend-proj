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

    return (ctx.body = { ...result })
  }
}

export default new AuthController()
