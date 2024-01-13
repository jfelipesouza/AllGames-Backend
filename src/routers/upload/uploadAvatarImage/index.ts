import { Request, Response } from 'express'
import { v4 } from 'uuid'

import { findUserById } from '../../../services/database/UserTable/GetUser'
import { uploadToSupabase } from '../../../services/database/Supabase/storage'
import { uploadAvatarInDB } from '../../../services/database/AvatarTable'

export const uploadAvatar = async (req: Request, res: Response) => {
  const userId = req.query.userID
  const file = req.file

  try {
    if (userId && file) {
      const user = await findUserById(userId as string)
      if (user !== null) {
        const fileName = user.image.id ? user.image.id : v4()
        const { fileUrl } = await uploadToSupabase({
          file: file.buffer,
          fileName,
          folder: 'avatars',
          mimeType: file.mimetype
        })
        const imageStatus = await uploadAvatarInDB(
          user.id,
          fileName,
          fileUrl,
          user.image.id ? true : false
        )
        if (imageStatus) {
          return res.status(200).send({ fileUrl })
        }
      } else {
        return res.status(400).send({ message: 'Usuario inexistente' })
      }
    } else {
      return res.status(400).send({ message: 'Impossivel atualizar imagem' })
    }
  } catch (error) {
    console.log(error)
    return res.status(400).send({ message: 'Erro ao salvar imagem' })
  }
}
