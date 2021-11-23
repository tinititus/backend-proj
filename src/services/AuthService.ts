import prismaClient from '../prisma'
import argon2 from 'argon2'

import { Error } from '../types'
class SignupService {
  async execute(email: string, password: string) {
    const userAlreadyExists = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    })

    if (userAlreadyExists) {
      const error = new Error('User already exists') as Error
      error.statusCode = 400
      throw error
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
}

export { SignupService }
