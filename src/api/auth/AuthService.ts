import prismaClient from '../../prisma'
import argon2 from 'argon2'

import { createAndThrowError } from '../../utils/createAndThrowError'

class SignupService {
  async execute(email: string, password: string) {
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
}

class LoginService {
  async execute(email: string, password: string) {
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

    return { user: user }
  }
}

export { SignupService, LoginService }
