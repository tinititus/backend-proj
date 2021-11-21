import { Context } from 'koa'
import { SignupService } from '../services/AuthService'

class SignupController {
  async handle(ctx: Context) {
    const { email, password } = ctx.request.body
    const service = new SignupService()
    const result = await service.execute(email, password)
    return (ctx.body = result)
  }
}

export { SignupController }
