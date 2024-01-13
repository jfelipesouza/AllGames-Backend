import { server } from './services/config/server'

const port = process.env.PORT || 3001

server.listen(port, () => {
  console.error(`the server is online in port ${port}`)
})
