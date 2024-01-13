import { Router } from 'express'
import multer from 'multer'

import { multerConfig } from '../../services/config/multer'
import { uploadAvatar } from './uploadAvatarImage'
import { uploadBanner } from './bannerImage'

const uploadRouters = Router()

const midleware = multer(multerConfig)

uploadRouters.put('/avatar', midleware.single('file'), uploadAvatar)
uploadRouters.put('/banner', midleware.single('file'), uploadBanner)

export { uploadRouters }
