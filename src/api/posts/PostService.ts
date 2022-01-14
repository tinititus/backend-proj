import prismaClient from '../../prisma'
import { createAndThrowError } from '../../utils/createAndThrowError'

class PostService {
  private static instance: PostService

  static getInstance() {
    if (this.instance) {
      return this.instance
    }
    this.instance = new PostService()
    return this.instance
  }

  public async createPost(title: string, content: string, userId: string) {
    const post = await prismaClient.post.create({
      data: {
        title,
        content,
        userId,
      },
    })

    return post
  }

  public async deletePost(id: string, userId: string) {
    const post = await prismaClient.post.findFirst({
      where: {
        id: {
          equals: id,
        },
        userId: {
          equals: userId,
        },
      },
    })

    if (!post) {
      createAndThrowError('Post not owned by user', 403)
    }

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

  public async getPosts() {
    const posts = await prismaClient.post.findMany()

    return posts
  }

  public async getPostById(id: string) {
    const post = await prismaClient.post.findUnique({
      where: {
        id: id,
      },
    })

    return post
  }

  public async updatePost(id: string, content: string, userId: string) {
    const post = await prismaClient.post.findFirst({
      where: {
        id: {
          equals: id,
        },
        userId: {
          equals: userId,
        },
      },
    })

    if (!post) {
      createAndThrowError('Post not owned by user', 403)
    }

    const updatedPost = await prismaClient.post.update({
      where: {
        id: id,
      },
      data: {
        content,
      },
    })

    return updatedPost
  }
}

export { PostService }
