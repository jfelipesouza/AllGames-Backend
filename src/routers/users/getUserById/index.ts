import { Request, Response } from 'express'
import { allInformationById } from '../../../services/database/UserTable/GetUser'

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.query.id as string

    if (userId) {
      const user = await allInformationById(userId.trim())
      if (user) {
        return res.status(200).send({
          user
        })
      }
    }
  } catch (error) {
    console.error(error)
  }
  return res.status(404).send({ message: 'Usuario não encontrado' })
}
