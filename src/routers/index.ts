import { Request, Router, Response } from 'express'
import { eventsRouter } from './events'
import { userRouter } from './users'
import { uploadRouters } from './upload'

const router = Router()
const port = process.env.PORT || 3001

router.get('/', (req: Request, res: Response) => {
  return res.status(200).send({
    status: 'Application is Running',
    port
  })
})

router.use('/events', eventsRouter)
router.use('/user', userRouter)
router.use('/upload', uploadRouters)

export { router }
