import request from 'supertest'
import { server } from '../server'

describe('GET /posts', () => {
    afterAll(() => {
      return server.close()
    })

    it('should return all posts', async () => {
      const res = await request(server).get('/posts')
      expect(res.statusCode).toBe(200)
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: '1st post',
            content: 'This is the first post'
          }),
        ])
      )
    })
  })