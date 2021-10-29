import request from 'supertest'
import { server } from '../server'
import { CreatePostService, GetPostsService } from '../services/PostService'
import { prismaMock } from './../singleton'

const newDate = new Date()
const post = {
  id: '1',
  title: 'title-test',
  content: 'content-test',
  createdAt: newDate,
  updatedAt: newDate,
}
describe('POST /posts', () => {
  it('should create a new post', async () => {
    const service = new CreatePostService()
    prismaMock.post.create.mockResolvedValue(post)
    await expect(service.execute(post.title,post.content)).resolves.toEqual({
      id: '1',
      title: 'title-test',
      content: 'content-test',
      createdAt: newDate,
      updatedAt: newDate,
    })
  })
})



describe('GET /posts', () => {
  it('should return all posts', async () => {
    const service = new GetPostsService()
    prismaMock.post.findMany.mockResolvedValue([post, post])
    await expect(service.execute()).resolves.toHaveLength(2)
  })

  // afterAll(() => {
  //   return server.close()
  // })
  // it('should return all posts', async () => {
  //     const res = await request(server).get('/posts')
  //     expect(res.statusCode).toBe(200)
  //     expect(res.body).toEqual(
  //       expect.arrayContaining([
  //         expect.objectContaining({
  //           title: '1st post',
  //           content: 'This is the first post'
  //         }),
  //       ])
  //     )
  //   })
})