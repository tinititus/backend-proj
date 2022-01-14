import { Context } from 'koa'
import { PostService } from './PostService'

class PostController {
  private static instance: PostController

  static getInstance() {
    if (this.instance) {
      return this.instance
    }
    this.instance = new PostController()
    return this.instance
  }

  public async createPost(ctx: Context) {
    const { title, content } = ctx.request.body
    const userId = ctx.state.user
    const service = new PostService()
    const result = await service.createPost(title, content, userId)

    return (ctx.body = result)
  }

  public async deletePost(ctx: Context) {
    const { id } = ctx.params
    const userId = ctx.state.user
    const service = new PostService()
    const result = await service.deletePost(id, userId)

    return (ctx.body = result)
  }

  public async getPosts(ctx: Context) {
    const service = new PostService()
    const result = await service.getPosts()

    return (ctx.body = result)
  }

  public async getPostById(ctx: Context) {
    const { id } = ctx.params
    const service = new PostService()
    const result = await service.getPostById(id)

    return (ctx.body = result)
  }

  public async updatePost(ctx: Context) {
    const { id } = ctx.params
    const { content } = ctx.request.body
    const userId = ctx.state.user
    const service = new PostService()
    const result = await service.updatePost(id, content, userId)

    return (ctx.body = result)
  }
}

export { PostController }
