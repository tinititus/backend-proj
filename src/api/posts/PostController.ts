import { Context } from 'koa'
import {
  CreatePostService,
  DeletePostService,
  GetPostByIdService,
  GetPostsService,
  UpdatePostService,
} from './PostService'

class CreatePostController {
  async handle(ctx: Context) {
    const { title, content } = ctx.request.body
    const userId = ctx.state.user
    const service = new CreatePostService()
    const result = await service.execute(title, content, userId)

    return (ctx.body = result)
  }
}

class DeletePostController {
  async handle(ctx: Context) {
    const { id } = ctx.params
    const userId = ctx.state.user
    const service = new DeletePostService()
    const result = await service.execute(id, userId)

    return (ctx.body = result)
  }
}

class GetPostsController {
  async handle(ctx: Context) {
    const service = new GetPostsService()
    const result = await service.execute()

    return (ctx.body = result)
  }
}

class GetPostByIdController {
  async handle(ctx: Context) {
    const { id } = ctx.params
    const service = new GetPostByIdService()
    const result = await service.execute(id)

    return (ctx.body = result)
  }
}

class UpdatePostController {
  async handle(ctx: Context) {
    const { id } = ctx.params
    const { content } = ctx.request.body
    const userId = ctx.state.user
    const service = new UpdatePostService()
    const result = await service.execute(id, content, userId)

    return (ctx.body = result)
  }
}

export {
  CreatePostController,
  DeletePostController,
  GetPostsController,
  GetPostByIdController,
  UpdatePostController,
}
