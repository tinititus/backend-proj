import prismaClient from '../prisma'
import argon2 from 'argon2'

class SignupService {
  async execute(email: string, password: string) {
    const userExists = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    })

    if (userExists) {
      throw new Error('User already exists.')
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
