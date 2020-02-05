import { createServer } from 'http'
import express from 'express'
import { json } from 'body-parser'
import cors from 'cors'
import { Server, OPEN } from 'ws'
import engine from './engine'
import readme from './readme'
import tendermint from './tendermint'

const app = express()
app.use(cors())
app.use(json())

const server = createServer(app)

const apis = [...engine(), ...readme(), ...tendermint()]
const sockets = apis
  .filter((api) => api.method === 'WS')
  .map((api) => ({ ...api, server: new Server({ noServer: true }) }))

apis
  .filter((api) => api.method === 'GET' || api.method === 'POST')
  .forEach((api) =>
    app[api.method.toLowerCase()](api.path, async (req, res) => {
      try {
        if (api.strict) {
          await api.handler(req, res)
        } else {
          const result = await api.handler(req, res)
          res.json(result)
        }
      } catch (e) {
        res.status(500).json(e)
      }
    })
  )

sockets.forEach((api) => {
  api.server.on('connection', (client) => {
    const listener = (data) => {
      if (client.readyState !== OPEN) {
        return
      }
      client.send(JSON.stringify(data))
    }
    client.on('close', () => api.emitter.removeListener('data', listener))
    api.emitter.on('data', listener)
  })
})

server.on('upgrade', (request, socket, head) => {
  const api = sockets.find((api) => `/api${api.path}` === request.url)
  if (!api) {
    if (socket) return socket.destroy()
  }
  api.server.handleUpgrade(request, socket, head, (ws) => {
    api.server.emit('connection', ws, request)
  })
})

server.listen(3002)

export default {
  path: '/api',
  handler: app
}
