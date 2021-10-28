import Router from 'koa-router'
import { CreatePostController, DeletePostController, GetPostByIdController, GetPostsController, UpdatePostController } from './controllers/PostController'

const router = new Router()

router.post('/post', new CreatePostController().handle)
router.delete('/posts/:id', new DeletePostController().handle)
router.get('/posts', new GetPostsController().handle)
router.get('/posts/:id', new GetPostByIdController().handle)
router.patch('/posts/:id', new UpdatePostController().handle)

export { router }
