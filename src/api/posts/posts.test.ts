import {
  CreatePostService,
  DeletePostService,
  GetPostByIdService,
  GetPostsService,
  UpdatePostService,
} from './PostService'
import { prismaMock } from '../../singleton'

const newDate = new Date()
const post = {
  id: '1',
  title: 'title-test',
  content: 'content-test',
  createdAt: newDate,
  updatedAt: newDate,
  userId: 'user1',
}

describe('POST /posts', () => {
  it('should create a new post', async () => {
    const service = new CreatePostService()
    prismaMock.post.create.mockResolvedValue(post)
    await expect(
      service.execute(post.title, post.content, 'user1'),
    ).resolves.toEqual(post)
  })
})

describe('GET /posts', () => {
  it('should return all posts', async () => {
    const service = new GetPostsService()
    prismaMock.post.findMany.mockResolvedValue([post, post, post])
    await expect(service.execute()).resolves.toEqual([post, post, post])
  })
})

describe('GET /posts/:id', () => {
  it('should return one post', async () => {
    const service = new GetPostByIdService()
    prismaMock.post.findUnique.mockResolvedValue(post)
    await expect(service.execute(post.id)).resolves.toEqual(post)
  })
})

describe('PATCH /posts/:id', () => {
  it('should update post', async () => {
    const service = new UpdatePostService()
    prismaMock.post.findFirst.mockResolvedValue(post)
    prismaMock.post.update.mockResolvedValue({ ...post, title: 'new-title' })
    await expect(
      service.execute(post.id, 'new-title', 'user1'),
    ).resolves.toEqual({
      ...post,
      title: 'new-title',
    })
  })
})

describe('DELETE /posts/:id', () => {
  it('should delete a post', async () => {
    const service = new DeletePostService()
    prismaMock.post.findFirst.mockResolvedValue(post)
    prismaMock.post.delete.mockResolvedValue(post)
    await expect(service.execute(post.id, 'user1')).resolves.toEqual({
      message: 'Post deleted successfully!',
      postId: '1',
    })
  })
})
