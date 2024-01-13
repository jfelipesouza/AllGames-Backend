import { Request, Response } from 'express'
import { v4 } from 'uuid'

import { uploadToSupabase } from '../../../services/database/Supabase/storage'
import { uploadBannerInDb } from '../../../services/database/ImagesTable'

export const uploadBanner = async (req: Request, res: Response) => {
  const file = req.file
  const { id, update, eventId } = req.query

  try {
    const status = update === 'true'

    console.log({
      status,
      update
    })
    if (file) {
      const { fileUrl } = await uploadToSupabase({
        file: file.buffer,
        fileName: id as string,
        folder: 'images',
        mimeType: file.mimetype
      })

      const imageStatus = await uploadBannerInDb(
        eventId as string,
        id as string,
        fileUrl,
        status
      )

      if (imageStatus !== null) {
        return res.status(200).send({ message: 'Sucesso ao salvar' })
      }
    } else {
      return res.status(400).send({ message: 'Usuario inexistente' })
    }
  } catch (error) {
    console.log(error)
  }
  return res.status(400).send({ message: 'Erro ao salvar imagem' })
}
