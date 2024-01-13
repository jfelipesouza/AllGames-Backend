import { prisma } from '..'

export const uploadImage = async (
  userId: string,
  fileName: string,
  filePath: string,
  fileExisting: boolean
) => {
  let status: boolean = false
  try {
    if (!fileExisting) {
      await prisma.avatarImage.create({
        data: {
          name: fileName,
          url: filePath,
          id: fileName,
          userId
        }
      })
    }
    await prisma.avatarImage.update({
      data: {
        url: filePath
      },
      where: {
        id: fileName
      }
    })
    status = true
  } catch (error) {
    console.log(error)
  } finally {
    prisma.$disconnect()
    return status
  }
}
