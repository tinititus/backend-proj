import prismaClient from '../../prisma'
import { createAndThrowError } from '../../utils/createAndThrowError'

class CreatePostService {
  async execute(title: string, content: string, userId: string) {
    const post = await prismaClient.post.create({
      data: {
        title,
        content,
        userId,
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
      createAndThrowError('Record to delete does not exist.', 400)
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
