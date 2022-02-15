import Router from 'koa-router'
import authController from './AuthController'

const router = new Router()

router.post('/signup', authController.signUp)
router.post('/login', authController.login)
router.post('/reset-password', authController.createResetToken)
router.post('/new-password', authController.saveNewPassword)

export default router
