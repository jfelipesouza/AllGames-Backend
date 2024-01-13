import { prisma } from '../..'

export const confirmUserAccount = async (id: string): Promise<boolean> => {
  let status = false
  console.log('chamou')
  try {
    const user = await prisma.user.update({
      where: {
        id
      },
      data: {
        confirmAccount: true
      }
    })

    const now = new Date(Date.now())

    if (user.type === 'admin') {
      const profile = await prisma.adminProfile.create({
        data: {
          contactEmail: user.email,
          contactPhone: '',
          paymentPlan: 'free',
          createAt: now,
          updateAt: now,
          userId: id
        }
      })
      if (profile) status = true
    } else {
      const profile = await prisma.profile.create({
        data: {
          birth: now,
          gender: '',
          name: '',
          phone: '',
          userId: id
        }
      })
      if (profile) status = true
    }
  } catch (err) {
    console.error(err)
  } finally {
    console.log(status)
    return status
  }
}
