import { Context, Next } from 'koa'
import jwt from 'jsonwebtoken'

interface DecodedJWT {
  email: string
  exp: number
  iat: number
  userId: string
}

export function isAuth(ctx: Context, next: Next) {
  const token = ctx.get('Authorization').split(' ')[1]
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as DecodedJWT

  ctx.state.user = decodedToken.userId

  return next()
}
