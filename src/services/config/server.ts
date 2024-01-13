import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { corsConfig } from './cors'
import { router } from '../../routers'

// Created server
const server = express()

// Set Middlewares
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cors(corsConfig))
server.use(morgan('dev'))
server.use('/', router)

export { server }
