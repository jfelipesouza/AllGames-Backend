import { prisma } from '../..'
import { Events } from '../../../../@types/EventsObjects'

type FindEvents = {
  start: number
  lenght: number
  text?: string
}
const findEvents = async ({ lenght, start, text }: FindEvents) => {
  let eventsData = []
  try {
    if (text?.trim() !== '') {
      const events = await prisma.event.findMany({
        where: {
          name: {
            startsWith: text
          }
        },
        select: {
          id: true,
          name: true,
          banner: true,
          description: true,
          authorName: true,
          eventInfo: {
            select: {
              address: true,
              contactMail: true,
              contactPhone: true,
              date: true,
              shirtSizes: true
            }
          },
          adminProfile: {
            select: {
              id: true,
              cnpj: true,
              contactEmail: true,
              contactPhone: true
            }
          },
          membersSubscribe: {
            select: {
              id: true,
              km: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip: start,
        take: lenght
      })
      eventsData = events
    } else {
      const events = await prisma.event.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          id: true,
          name: true,
          banner: true,
          description: true,
          authorName: true,
          eventInfo: {
            select: {
              address: true,
              contactMail: true,
              contactPhone: true,
              date: true,
              shirtSizes: true
            }
          },
          adminProfile: {
            select: {
              id: true,
              cnpj: true,
              contactEmail: true,
              contactPhone: true
            }
          },
          membersSubscribe: {
            select: {
              id: true,
              km: true
            }
          }
        },
        skip: start,
        take: lenght
      })
      eventsData = events
    }
    return eventsData
  } catch (error) {
    console.warn(error)
    throw new Error()
  } finally {
    await prisma.$disconnect()
  }
}

export { findEvents }
