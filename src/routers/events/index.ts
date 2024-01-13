import { Request, Response, Router } from 'express'
import { findEvents } from '../../services/database/EventsTable/GetAllEvents'
import { getEventByUserID } from './getEventsByUserID'
import { createEvent } from './createEvents'
import { prisma } from '../../services/database'

const eventsRouter = Router()

interface GetAllEventsQuery {
  start: number
  lenght: number
  text?: string
}

eventsRouter.get(
  '/',
  async (req: Request<{}, {}, {}, GetAllEventsQuery>, res: Response) => {
    /*  const { lenght, start, text }: GetAllEventsQuery = req.query

    try {
      const events = await findEvents({
        lenght: Number(lenght),
        start: Number(start),
        text
      })
      return res.status(200).send({
        events
      })
    } catch (error) {
      return res.status(400).send({
        message:
          'Um erro inesperado aconteceu, verifique se a chamada ao endpoint está correta'
      })
    }
  }
   */
    try {
      const events = await prisma.event.findMany({
        include: { eventInfo: true }
      })
      return res.send({ events })
    } catch (error) {}
  }
)

eventsRouter.get('/admin', getEventByUserID)
eventsRouter.post('/create', createEvent)

export { eventsRouter }
