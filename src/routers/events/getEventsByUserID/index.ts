import { Request, Response } from 'express'
import { prisma } from '../../../services/database'

export const getEventByUserID = async (req: Request, res: Response) => {
  try {
    const { id, start, end } = req.query
    console.log({ id })
    const events = await prisma.event.findMany({
      where: {
        adminProfile: {
          userId: id as string
        }
      },
      include: {
        banner: {
          select: {
            url: true
          }
        },
        eventInfo: true
      }
    })
    return res.send({ events })
  } catch (error) {}
  return res.send({ message: 'Foi ' })
}
