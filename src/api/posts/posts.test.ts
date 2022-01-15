import postService from './PostService'
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
    prismaMock.post.create.mockResolvedValue(post)
    await expect(
      postService.createPost(post.title, post.content, 'user1'),
    ).resolves.toEqual({
      id: '1',
      title: 'title-test',
      content: 'content-test',
      createdAt: newDate,
      updatedAt: newDate,
      userId: 'user1',
    })
  })
})

describe('GET /posts', () => {
  it('should return all posts', async () => {
    prismaMock.post.findMany.mockResolvedValue([
      post,
      { ...post, id: '2', userId: 'user2' },
      { ...post, id: '3', userId: 'user3' },
    ])
    await expect(postService.getPosts()).resolves.toEqual([
      {
        id: '1',
        title: 'title-test',
        content: 'content-test',
        createdAt: newDate,
        updatedAt: newDate,
        userId: 'user1',
      },
      {
        id: '2',
        title: 'title-test',
        content: 'content-test',
        createdAt: newDate,
        updatedAt: newDate,
        userId: 'user2',
      },
      {
        id: '3',
        title: 'title-test',
        content: 'content-test',
        createdAt: newDate,
        updatedAt: newDate,
        userId: 'user3',
      },
    ])
  })
})

describe('GET /posts/:id', () => {
  it('should return one post', async () => {
    prismaMock.post.findUnique.mockResolvedValue(post)
    await expect(postService.getPostById(post.id)).resolves.toEqual({
      id: '1',
      title: 'title-test',
      content: 'content-test',
      createdAt: newDate,
      updatedAt: newDate,
      userId: 'user1',
    })
  })
})

describe('PATCH /posts/:id', () => {
  it('should update post', async () => {
    prismaMock.post.findFirst.mockResolvedValue(post)
    prismaMock.post.update.mockResolvedValue({
      ...post,
      content: 'new-content',
    })
    await expect(
      postService.updatePost(post.id, 'new-content', 'user1'),
    ).resolves.toEqual({
      id: '1',
      title: 'title-test',
      content: 'new-content',
      createdAt: newDate,
      updatedAt: newDate,
      userId: 'user1',
    })
  })
})

describe('DELETE /posts/:id', () => {
  it('should delete a post', async () => {
    prismaMock.post.findFirst.mockResolvedValue(post)
    prismaMock.post.delete.mockResolvedValue(post)
    await expect(postService.deletePost(post.id, 'user1')).resolves.toEqual({
      message: 'Post deleted successfully!',
      postId: '1',
    })
  })
})
