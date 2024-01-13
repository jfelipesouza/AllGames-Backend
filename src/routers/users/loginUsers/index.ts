import { Request, Response } from 'express'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { findUserByEmail } from '../../../services/database/UserTable/GetUser'

type RequestParam = {
  email: string
  password: string
}

const AUTH_JWT_DECODE = process.env.AUTH_JWT_DECODE

export const loginUser = async (req: Request, res: Response) => {
  const { email, password }: RequestParam = req.body

  if (email && password) {
    try {
      const findUser = await findUserByEmail(email.trim())
      if (findUser) {
        const verifyPass = await compare(password.trim(), findUser.password!)
        if (verifyPass) {
          if (findUser.confirmAccount) {
            const token = sign(
              {
                id: findUser.id,
                confirm: findUser.confirmAccount,
                type: findUser.type
              },
              AUTH_JWT_DECODE!,
              { expiresIn: '24h' }
            )
            const refreshToken = sign(
              {
                id: findUser.id,
                confirm: findUser.confirmAccount,
                type: findUser.type
              },
              AUTH_JWT_DECODE!,
              { expiresIn: '92h' }
            )
            const user: UserLoginResponseInfo = {
              email: findUser.email,
              id: findUser.id,
              image: { ...findUser.image },
              profile:
                findUser.type === 'admin'
                  ? {
                      name: findUser.adminProfile.name,
                      paymentPlan: findUser.adminProfile.paymentPlan,
                      cnpj: findUser.adminProfile.cnpj,
                      contactEmail: findUser.adminProfile.contactEmail,
                      contactPhone: findUser.adminProfile.contactPhone
                    }
                  : {
                      birth: findUser.profile.birth,
                      gender: findUser.profile.gender,
                      cpf: findUser.profile.cpf,
                      name: findUser.profile.name,
                      phone: findUser.profile.phone
                    },
              type: findUser.type
            }
            return res
              .status(200)
              .send({ token, refreshToken, type: 'SUCCESS', user })
          } else {
            return res.status(200).send({
              message: 'Confirmação de conta pendente',
              type: 'WARN'
            })
          }
        }
        return res.status(400).send({ message: 'E-mail ou senha incorreta' })
      } else {
        return res.status(400).send({ message: 'E-mail ou senha incorreta' })
      }
    } catch (error) {
      console.error(error)
      return res.status(400).send({ message: 'Erro ao fazer login' })
    }
  }
  return res.status(400).send({ message: 'Erro ao fazer login' })
}
