import Koa from 'koa'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import { router } from './routes'

const app = new Koa()

app.use(logger())
app.use(bodyParser())
app.use(router.routes())

export { app }
