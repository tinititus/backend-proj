import { Context, Next } from 'koa'
import jwt from 'jsonwebtoken'
import { createAndThrowError } from '../utils/createAndThrowError'

interface DecodedToken {
  email: string
  exp: number
  iat: number
  userId: string
}

export function isAuth(ctx: Context, next: Next) {
  const token = ctx.get('Authorization').split(' ')[1]
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken

  if (!decodedToken) {
    createAndThrowError('Not authenticated.', 401)
  }

  ctx.state.user = decodedToken.userId
  return next()
}
