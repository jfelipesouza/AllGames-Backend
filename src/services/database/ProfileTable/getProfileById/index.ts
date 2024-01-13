import { prisma } from '../..'

type EventInfo = {
  id: string
  name: string
  date: Date
  authorName: string
  eventInfo: {
    banner: string | null
    address: string
  } | null
}

type ImageInfo = {
  id: string
  url: string
  name: string
}

type UserProfileInfo = {
  birth: Date
  cpf: string
  email: string
  image: ImageInfo | null
  name: string
  gender: string
  phone: string
  id: string
  events: { event: EventInfo }[] | any
}

export const getUserProfileByUserId = async (
  id: string
): Promise<UserProfileInfo | null> => {
  try {
    const informations = await prisma.user.findFirst({
      where: {
        id: id
      },
      select: {
        image: {
          select: {
            id: true,
            url: true,
            name: true
          }
        },
        email: true,
        type: true,
        profile: {
          select: {
            id: true,
            birth: true,
            cpf: true,
            gender: true,
            name: true,
            phone: true,
            events: {
              select: {
                event: {
                  select: {
                    id: true,
                    authorName: true,
                    banner: true,
                    name: true,
                    eventInfo: {
                      select: {
                        date: true,
                        address: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    })
    if (informations && informations.profile && informations.profile.events) {
      const { birth, cpf, events, gender, name, phone, id } =
        informations.profile
      const { image, email } = informations

      return { birth, cpf, events, gender, name, phone, image, email, id }
    }

    return null
  } catch (error) {
    return null
  }
}
