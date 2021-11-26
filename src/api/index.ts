import combineRouters from 'koa-combine-routers'
import postRouter from './posts/post'
import authRouter from './auth/auth'

const router = combineRouters(postRouter, authRouter)

export default router
