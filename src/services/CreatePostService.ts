import prismaClient from '../prisma'

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

export { CreatePostService }
