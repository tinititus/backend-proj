import { Context } from 'koa'
import postService from './PostService'

class PostController {
  public async createPost(ctx: Context) {
    const { title, content } = ctx.request.body
    const userId = ctx.state.user
    const result = await postService.createPost(title, content, userId)

    return (ctx.body = result)
  }

  public async deletePost(ctx: Context) {
    const { id } = ctx.params
    const userId = ctx.state.user
    const result = await postService.deletePost(id, userId)

    return (ctx.body = result)
  }

  public async getPosts(ctx: Context) {
    const result = await postService.getPosts()

    return (ctx.body = result)
  }

  public async getPostById(ctx: Context) {
    const { id } = ctx.params
    const result = await postService.getPostById(id)

    return (ctx.body = result)
  }

  public async updatePost(ctx: Context) {
    const { id } = ctx.params
    const { content } = ctx.request.body
    const userId = ctx.state.user
    const result = await postService.updatePost(id, content, userId)

    return (ctx.body = result)
  }
}

export default new PostController()
