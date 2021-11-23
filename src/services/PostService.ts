import prismaClient from '../prisma'
import { Error } from '../types'

class CreatePostService {
  async execute(title: string, content: string) {
    const post = await prismaClient.post.create({
      data: {
        title,
        content,
      },
    })

    return post
  }
}

class DeletePostService {
  async execute(id: string) {
    // todo: check if user is owner of post
    try {
      await prismaClient.post.delete({
        where: {
          id: id,
        },
      })
      return { message: 'Post deleted successfully!', postId: id }
    } catch (err: unknown) {
      const error = err as Error
      error.message = 'Record to delete does not exist.'
      error.statusCode = 400
      throw error
    }
  }
}

class GetPostsService {
  async execute() {
    const posts = await prismaClient.post.findMany()
    return posts
  }
}

class GetPostByIdService {
  async execute(id: string) {
    const post = await prismaClient.post.findUnique({
      where: {
        id: id,
      },
    })
    return post
  }
}

class UpdatePostService {
  async execute(id: string, content: string) {
    const post = await prismaClient.post.update({
      where: {
        id: id,
      },
      data: {
        content,
      },
    })
    return post
  }
}

export {
  CreatePostService,
  DeletePostService,
  GetPostsService,
  GetPostByIdService,
  UpdatePostService,
}
