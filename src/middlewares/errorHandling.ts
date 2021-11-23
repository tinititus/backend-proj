import { Context, Next } from 'koa'
import { Error } from '../types'

export default async (ctx: Context, next: Next) => {
  try {
    await next()
  } catch (err: unknown) {
    // will only respond with JSON
    const { message, statusCode } = err as Error
    ctx.status = statusCode || 500
    ctx.body = {
      message: message,
    }
  }
}
