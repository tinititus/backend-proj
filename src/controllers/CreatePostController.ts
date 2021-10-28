import { Context } from 'koa'
import { CreatePostService } from '../services/CreatePostService'

class CreatePostController {
  async handle(ctx: Context) {
    const { title, content } = ctx.request.body
    const service = new CreatePostService()
    const result = await service.execute(title, content)
    // ctx.status = 201
    return (ctx.body = result)
  }
}

export { CreatePostController }
