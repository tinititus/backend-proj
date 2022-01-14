import Router from 'koa-router'
import { AuthController } from './AuthController'

const router = new Router()
const authController = AuthController.getInstance()

router.post('/signup', authController.signUp)
router.post('/login', authController.login)

export default router
