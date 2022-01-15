import Router from 'koa-router'
import postController from './PostController'
import { isAuth } from '../../middlewares/isAuth'

const router = new Router()

router.post('/posts', isAuth, postController.createPost)
router.delete('/posts/:id', isAuth, postController.deletePost)
router.get('/posts', postController.getPosts)
router.get('/posts/:id', postController.getPostById)
router.patch('/posts/:id', isAuth, postController.updatePost)

export default router
