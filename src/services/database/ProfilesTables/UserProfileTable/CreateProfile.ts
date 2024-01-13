import { prisma } from '../..'

export const CreateProfile = async (id: string): Promise<boolean> => {
  let status = false

  try {
    const newProfile = await prisma.profile.create({
      data: {
        birth: new Date(Date.now()),
        gender: '',
        name: '',
        phone: '',
        userId: id
      }
    })
    if (newProfile) {
      status = true
    }
  } catch (error) {
    console.error(error)
  } finally {
    await prisma.$disconnect()
    return status
  }
}
