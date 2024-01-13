import { Request, Response } from 'express'
import { hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { createUserInDB } from '../../../services/database/UserTable/CreateUser'
import { findUserByEmail } from '../../../services/database/UserTable/GetUser'
import { updateUserRegister } from '../../../services/database/UserTable/UpdateUser'
import { sendMailAccount } from '../../../services/mail/confirmAccount'

type RequestParams = {
  email: string
  password: string
  type: string
}

const EMAIL_JWT_DECODE = process.env.EMAIL_JWT_DECODE || 'teste'

export const createUser = async (req: Request, res: Response) => {
  const { email, password, type }: RequestParams = req.body

  if (email && password && type) {
    const hashPassword = await hash(password.trim(), 12)

    if (type.trim() === 'client') {
      const user = await findUserByEmail(email)

      if (user) {
        if (user.confirmAccount) {
          return res.status(400).send({ message: 'Usuário já cadastrado' })
        } else {
          const updateUser = await updateUserRegister(user.id, hashPassword)
          if (updateUser) {
            // Enviar email para confirmação de conta
            const token = sign(
              { id: updateUser.id, code: updateUser.confirmCode },
              EMAIL_JWT_DECODE
            )
            await sendMailAccount({
              to: email,
              subject: 'Confirmação de conta',
              token: token
            })

            return res
              .status(200)
              .send({ message: 'E-mail de confirmação enviado' })
          } else {
            return res.status(400).send({
              message: 'Falha ao enviar email'
            })
          }
        }
      }

      const newUser = await createUserInDB({
        email: email.trim(),
        password: hashPassword,
        type: type.trim()
      })

      if (newUser) {
        // Enviar email para confirmação de conta
        const token = sign(
          { id: newUser.id, code: newUser.confirmCode },
          EMAIL_JWT_DECODE
        )
        await sendMailAccount({
          to: email,
          subject: 'Confirmação de conta',
          token
        })

        return res.status(200).send({
          message: 'E-mail de confirmação enviado'
        })
      }
    } else if (type.trim() === 'admin') {
      const user = await findUserByEmail(email)

      if (user) {
        if (user.confirmAccount) {
          return res.status(400).send({ message: 'Usuário já cadastrado' })
        } else {
          const updateUser = await updateUserRegister(user.id, hashPassword)
          if (updateUser) {
            // Enviar email para confirmação de conta
            const token = sign(
              { id: updateUser.id, code: updateUser.confirmCode },
              EMAIL_JWT_DECODE
            )
            await sendMailAccount({
              to: email,
              subject: 'Confirmação de conta',
              token: token
            })

            return res
              .status(200)
              .send({ message: 'E-mail de confirmação enviado' })
          } else {
            return res.status(400).send({
              message: 'Falha ao enviar email'
            })
          }
        }
      }

      const newUser = await createUserInDB({
        email: email.trim(),
        password: hashPassword,
        type: type.trim()
      })

      if (newUser) {
        // Enviar email para confirmação de conta
        const token = sign(
          { id: newUser.id, code: newUser.confirmCode },
          EMAIL_JWT_DECODE
        )
        await sendMailAccount({
          to: email,
          subject: 'Confirmação de conta',
          token
        })

        return res.status(200).send({
          message: 'E-mail de confirmação enviado'
        })
      }
      return res.status(400).send({})
    }
  } else {
    return res
      .status(400)
      .send({ message: 'Informação insulficiente para cadastro' })
  }

  return res.status(400).send({ message: 'Erro ao registrar usuario' })
}
