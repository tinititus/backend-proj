import Router from 'koa-router'
import { CreatePostController } from './controllers/CreatePostController'

const router = new Router()

router.post('/post', new CreatePostController().handle)

export { router }
