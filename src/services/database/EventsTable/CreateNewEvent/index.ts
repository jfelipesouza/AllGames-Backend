import { prisma } from '../..'

type EventCreateInfo = {
  userID: string
  name: string
  authorName: string
  description: string
  eventInfo: {
    address: string
    date: Date
    subDate: Date
    shirtSizes: string[]
    contactMail: string
    contactPhone: string
    open: boolean
  }
}

const createEventInDB = async ({
  authorName,
  description,
  eventInfo,
  userID,
  name
}: EventCreateInfo) => {
  try {
    const event = await prisma.event.create({
      data: {
        authorName,
        adminProfile: {
          connect: {
            id: userID
          }
        },
        name,
        description,
        eventInfo: {
          create: {
            address: eventInfo.address,
            date: new Date(eventInfo.date),
            open: eventInfo.open,
            subscribeDate: new Date(eventInfo.subDate),
            shirtSizes: eventInfo.shirtSizes,
            contactMail: eventInfo.contactMail,
            contactPhone: eventInfo.contactPhone
          }
        }
      }
    })
    return event
  } catch (error) {
    console.log(error)
    return null
  }
}

export { createEventInDB }
