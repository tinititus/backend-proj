import Router from 'koa-router'
import { SignupController } from '../controllers/AuthController'

const router = new Router()

router.post('/signup', new SignupController().handle)

export default router
