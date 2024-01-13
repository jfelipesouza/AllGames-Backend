import crypto from 'node:crypto'
import { prisma } from '../..'

type UserObject = {
  email: string
  password: string
  type: string
}

const createUserInDB = async ({ email, password, type }: UserObject) => {
  try {
    const userExists = await prisma.user.findFirst({
      where: {
        email
      }
    })
    if (userExists) {
      throw new Error('Usuario existente')
    }
    const expiresToken = new Date()
    expiresToken.setHours(expiresToken.getHours() + 24)

    const code = crypto.randomUUID()
    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        type,
        confirmAccount: false,
        confirmAccountExpires: expiresToken,
        confirmCode: code
      }
    })

    return {
      id: newUser.id,
      type: newUser.type,
      confirmCode: newUser.confirmCode
    }
  } catch (error) {
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}

export { createUserInDB }
