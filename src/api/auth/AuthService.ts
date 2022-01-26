import prismaClient from '../../prisma'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import nodemailerSendgrid from 'nodemailer-sendgrid'

import { createAndThrowError } from '../../utils/createAndThrowError'
import { randomBytes } from 'crypto'

const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY,
  }),
)

class AuthService {
  async signUp(email: string, password: string) {
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
      from: 'titoxmartini@gmail.com',
      subject: 'Welcome to backend-proj',
      html: '<h1>You successfully signed up!</h1>',
    })

    return { message: 'User created!', userId: user.id }
  }

  async login(email: string, password: string) {
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
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    )

    return { token: token, userId: user.id, message: 'Login succeeded.' }
  }
}

export default new AuthService()
