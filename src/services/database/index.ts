import { PrismaClient } from '@prisma/client'

// Contants connection in database
const prisma = new PrismaClient()

export { prisma }
