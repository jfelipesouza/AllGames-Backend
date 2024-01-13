import { Request, Response } from 'express'

import { createEventInDB } from '../../../services/database/EventsTable/CreateNewEvent'
import { findAdminProfilebyId } from '../../../services/database/ProfilesTables/AdminProfileTable'

type EventRequestParams = {
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
    open: true
  }
}

export const createEvent = async (req: Request, res: Response) => {
  const data = req.body
  try {
    const user = await findAdminProfilebyId(data.userID as string)
    if (user !== null) {
      const eventData: EventRequestParams = {
        authorName: user.name,
        description: data.description,
        name: data.name,
        userID: user.id,
        eventInfo: data.eventInfo
      }
      const newEvent = await createEventInDB(eventData)
      return res.status(200).send({ event: newEvent })
    }
    return res.status(400).send({ message: 'Falha ao criar evento' })
  } catch (error) {
    console.log(error)
  }
  return res.status(400).send({ message: 'Erro ao criar evento ' })
}
