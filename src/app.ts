import Koa from 'koa'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import router from './routes/index'

const app = new Koa()

app.on('error', (err, ctx): void => console.error('Server Error: ', err, ctx))
app.use(logger())
app.use(bodyParser())
// todo: add cors, error handling, etc.
app.use(router())

export { app }
