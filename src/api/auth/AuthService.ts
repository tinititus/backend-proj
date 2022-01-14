import prismaClient from '../../prisma'
import argon2 from 'argon2'

import { createAndThrowError } from '../../utils/createAndThrowError'

class AuthService {
  private static instance: AuthService

  static getInstance() {
    if (this.instance) {
      return this.instance
    }
    this.instance = new AuthService()
    return this.instance
  }

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

    return { userId: user?.id, message: 'Login succeeded.' }
  }
}

export { AuthService }
