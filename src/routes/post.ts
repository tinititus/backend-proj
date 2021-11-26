import Router from 'koa-router'
import {
  CreatePostController,
  DeletePostController,
  GetPostByIdController,
  GetPostsController,
  UpdatePostController,
} from '../controllers/PostController'
import { isAuth } from '../middlewares/isAuth'

const router = new Router()

router.post('/posts', isAuth, new CreatePostController().handle)
router.delete('/posts/:id', isAuth, new DeletePostController().handle)
router.get('/posts', new GetPostsController().handle)
router.get('/posts/:id', new GetPostByIdController().handle)
router.patch('/posts/:id', isAuth, new UpdatePostController().handle)

export default router
