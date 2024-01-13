import { prisma } from '../..'

export const findAdminProfilebyId = async (id: string) => {
  try {
    console.log({ id })
    const adminProfile = await prisma.adminProfile.findFirst({
      where: {
        id
      }
    })
    console.log({ adminProfile })
    if (adminProfile) {
      return adminProfile
    }
    return null
  } catch (error) {
    console.log(error)
  }
  return null
}
