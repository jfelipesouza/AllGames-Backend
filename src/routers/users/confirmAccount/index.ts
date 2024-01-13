import { Request, Response } from 'express'

import { findUserById } from '../../../services/database/UserTable/GetUser'
import { confirmUserAccount } from '../../../services/database/UserTable/UpdateUser'

export const confirmAccount = async (req: Request, res: Response) => {
  const { code, id } = req.body

  console.log({ body: req.body })

  try {
    // Busca o usuario na base de dados
    const user = await findUserById(id)

    if (user) {
      // Pega o tempo de expiração
      const timeExpires = user.confirmAccountExprires!.getTime()
      if (user.confirmAccount) {
        // Se ativo retorna issol
        return res.status(200).send({ message: 'Usuario já ativo' })
      }
      if (timeExpires < Date.now()) {
        // Se tempo de expirção já bateu retorna isso
        return res.status(400).send({
          message: 'Tempo de confirmação expirado'
        })
      }
      // verifica se o código é o mesmo
      if (code === user.confirmAccountCode) {
        const status = await confirmUserAccount(id)
        if (status) {
          return res.status(200).send({ message: 'Conta confirmada!' })
        } else {
          return res.status(400).send({ message: 'Falha ao confirmar conta' })
        }
      }
    }
  } catch (error) {
    console.error(error)
  }
  return res
    .status(400)
    .send({ message: 'Erro ao confirmar conta, tente mais tarde' })
}
