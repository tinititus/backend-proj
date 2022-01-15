import Router from 'koa-router'
import authController from './AuthController'

const router = new Router()

router.post('/signup', authController.signUp)
router.post('/login', authController.login)

export default router
