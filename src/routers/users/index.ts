import { Router } from 'express'
import { createUser } from './createUsers'
import { prisma } from '../../services/database'
import { loginUser } from './loginUsers'
import { confirmAccount } from './confirmAccount'
import { getUserById } from './getUserById'
import { updateUserInfo } from './updateUserInformation'

const userRouter = Router()

userRouter.get('/', async (req, res) => {
  const users = await prisma.user.findMany()
  return res.send({ users })
})
userRouter.get('/info', getUserById)

userRouter.post('/register', createUser)
userRouter.post('/signin', loginUser)

userRouter.put('/confirm', confirmAccount)
userRouter.put('/update', updateUserInfo)

export { userRouter }
