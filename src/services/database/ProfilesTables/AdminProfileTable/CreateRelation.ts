import { prisma } from '../..'

export const CreateRelationInUserAndAdminProfile = async (
  id: string,
  email: string
): Promise<boolean> => {
  var status = false

  try {
    const now = new Date(Date.now())
    const newProfile = await prisma.adminProfile.create({
      data: {
        contactEmail: email,
        contactPhone: '',
        paymentPlan: 'free',
        createAt: now,
        updateAt: now,
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
