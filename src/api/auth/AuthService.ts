import prismaClient from '../../prisma'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import nodemailerSendgrid from 'nodemailer-sendgrid'

import { createAndThrowError } from '../../utils/createAndThrowError'
import { randomBytes } from 'crypto'

const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY!,
  }),
)

class AuthService {
  public async signUp(email: string, password: string) {
    const userAlreadyExists = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    })

    if (userAlreadyExists) {
      createAndThrowError('User already exists.', 400)
    }

    const hashedPassword = await argon2.hash(password)
    const user = await prismaClient.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })

    await transport.sendMail({
      to: email,
      from: process.env.SENDMAIL_FROM,
      subject: 'Welcome to backend-proj',
      html: '<h1>You successfully signed up!</h1>',
    })

    return { message: 'User created!', userId: user.id }
  }

  public async login(email: string, password: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    })

    if (!user) {
      createAndThrowError('Invalid credentials.', 401)
    }

    const isPasswordValid = await argon2.verify(user!.password, password)

    if (!isPasswordValid) {
      createAndThrowError('Invalid credentials.', 401)
    }

    const token = jwt.sign(
      { email: email, userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' },
    )

    return { token: token, userId: user.id, message: 'Login succeeded.' }
  }

  public async createResetToken(email: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    })

    if (!user) {
      createAndThrowError('Account not found', 404)
    }

    randomBytes(32, async (error, buffer) => {
      if (error) {
        createAndThrowError(error.message, 500)
      }

      const token = buffer.toString('hex')
      const requestedDate = Date.now()
      const tokenExpiration = requestedDate + 3600000
      await prismaClient.tokenReset.create({
        data: {
          tokenHash: token,
          requestedDate: new Date(requestedDate),
          expirationDate: new Date(tokenExpiration),
          userId: user.id,
        },
      })
      await transport.sendMail({
        to: email,
        from: process.env.SENDMAIL_FROM,
        subject: 'Password Reset',
        html: `
          <p>You requested a password reset</p>
          <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
        `,
      })
    })
    return {
      message: 'If the informed account exists, an e-mail should arrive soon.',
    }
  }

  public async saveNewPassword(newPassword: string, token: string) {
    const tokenReset = await prismaClient.tokenReset.findFirst({
      where: {
        tokenHash: {
          equals: token,
        },
        expirationDate: {
          gt: new Date(Date.now()),
        },
        done: {
          equals: false,
        },
      },
    })

    if (!tokenReset) {
      createAndThrowError('Invalid token', 400)
    }

    const hashedPassword = await argon2.hash(newPassword)
    await prismaClient.user.update({
      where: {
        id: tokenReset.userId,
      },
      data: {
        password: hashedPassword,
      },
    })
    await prismaClient.tokenReset.update({
      where: {
        id: tokenReset.id,
      },
      data: {
        done: true,
      },
    })

    return { message: 'Password changed successfully!' }
  }
}

export default new AuthService()
