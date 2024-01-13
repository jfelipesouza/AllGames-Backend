import { Response, Request } from 'express'

type RequestParams = {
  id: string
  type: string
  adminProfile?: {
    name?: string
    cnpj?: string
    email?: string
    phone?: string
  }
  profile?: {
    name?: string
    gender?: string
    cpf?: string
    birth?: Date
    phone?: string
  }
  image?: {
    id: string
    url: string
    name: string
  }
}
const updateUserInfo = async (req: Request, res: Response) => {
  const requestData = req.body as RequestParams

  try {
    if (requestData.id.trim() !== '' && requestData.type.trim() !== '') {
      if (requestData.image) {
        console.log(requestData.image)
      }
      if (requestData.type === 'admin') {
        console.log(requestData.adminProfile)
      } else if (requestData.type === 'client') {
        console.log(requestData.profile)
      }
      return res.status(200).send({ message: 'funciona' })
    }
    return res.status(400).send({ message: 'Ocorreu um erro, tente novamente' })
  } catch (error) {
    console.error(error)
    return res.status(400).send({ message: 'Ocorreu um erro, tente novamente' })
  }
}

export { updateUserInfo }
