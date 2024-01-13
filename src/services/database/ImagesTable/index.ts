import { prisma } from '..'

export const uploadBannerInDb = async (
  eventId: string,
  fileName: string,
  filePath: string,
  update: boolean
) => {
  try {
    if (update) {
      const image = await prisma.images.update({
        where: {
          id: fileName
        },
        data: {
          url: filePath
        }
      })

      return image
    }
    const image = await prisma.images.create({
      data: {
        name: fileName,
        url: filePath,
        id: fileName,
        eventId
      }
    })
    return image
  } catch (error) {
    console.log(error)
  }
  return null
}
