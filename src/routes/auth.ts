import Router from 'koa-router'
import {
  LoginController,
  SignupController,
} from '../controllers/AuthController'

const router = new Router()

router.post('/signup', new SignupController().handle)
router.post('/login', new LoginController().handle)

export default router
