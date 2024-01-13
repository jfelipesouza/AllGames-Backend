import crypto from 'node:crypto'
import { prisma } from '../..'
import { confirmUserAccount } from './ConfirmAccount'

const updateUserRegister = async (id: string, password: string) => {
  try {
    const expiresToken = new Date()
    expiresToken.setHours(expiresToken.getHours() + 24)

    const code = crypto.randomUUID()

    const user = await prisma.user.update({
      where: {
        id
      },
      data: {
        password: password,
        confirmAccount: false,
        confirmAccountExpires: expiresToken,
        confirmCode: code
      }
    })
    return user
  } catch (error) {
    console.error(error)
    return false
  } finally {
    await prisma.$disconnect()
  }
}

export { confirmUserAccount, updateUserRegister }
