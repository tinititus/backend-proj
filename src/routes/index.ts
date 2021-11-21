import combineRouters from 'koa-combine-routers'
import postRouter from './post'
import authRouter from './auth'

const router = combineRouters(postRouter, authRouter)

export default router
