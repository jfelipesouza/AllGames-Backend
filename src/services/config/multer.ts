import multer, { Options } from 'multer'
import { resolve } from 'node:path'
import crypto from 'node:crypto'

const uploadDir = resolve(__dirname, '..', '..', '..', 'tmp', 'uploads')

const storage = {
  disk: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir)
    },
    filename: (req, file: Express.Multer.File & { key: string }, cb) => {
      crypto.randomBytes(8, (err, hash) => {
        if (err) cb(err, err.message)
        file.key = `${hash.toString('hex')}-${file.originalname}`
        cb(null, file.key)
      })
    }
  }),
  memory: multer.memoryStorage()
}

const multerConfig: Options = {
  dest: uploadDir,
  storage: storage.memory,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2Mb
  },
  fileFilter: (req, file, cb) => {
    const allowFormat = [
      'image/pjpeg',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp'
    ]
    if (allowFormat.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid type'))
    }
  }
}

export { multerConfig }
