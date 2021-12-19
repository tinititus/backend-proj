import { Context, Next } from 'koa'
import { createAndThrowError } from '../utils/createAndThrowError'

export function isAuth(ctx: Context, next: Next) {
  if (ctx.cookies.get('isAuth') !== 'true') {
    createAndThrowError('Not authenticated.', 403)
  }
  ctx.state.user = ctx.cookies.get('userId')
  return next()
}
