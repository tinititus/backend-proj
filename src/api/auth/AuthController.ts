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

  public async createResetToken(ctx: Context) {
    const { email } = ctx.request.body
    const result = await authService.createResetToken(email)

    return (ctx.body = { ...result })
  }

  public async saveNewPassword(ctx: Context) {
    const { token, newPassword } = ctx.request.body
    const result = await authService.saveNewPassword(newPassword, token)

    return (ctx.body = { ...result })
  }
}

export default new AuthController()
