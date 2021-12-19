import Koa from 'koa'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import router from './api/index'
import errorHandling from './middlewares/errorHandling'

const app = new Koa()

// app.on('error', (err, ctx): void => console.error('Server Error: ', err, ctx))
app.use(logger())
app.use(errorHandling)
app.use(bodyParser())
// todo: add cors etc.
app.use(router())

export { app }
