// const { createServer } = require('http')
// const { Server } = require('ws')
const API = require('@mesg/api')
const { decode } = require('@mesg/api/lib/util/base58')

// const server = createServer(app)
// const ws = new Server({ server, port: process.env.NUXT_PORT })
// server.listen(process.env.NUXT_PORT)
const api = new API(`${process.env.ENGINE_HOST}:50052`)

// const createStreamSocket = (ws, api) => (resource) =>
//   api[resource].stream({}).on('data', (data) =>
//     ws.clients.forEach((client) => {
//       client.send(JSON.stringify({ resource, data }))
//     })
//   )

// const resourcesStream = ['execution', 'event']

// resourcesStream.forEach(createStreamSocket(ws, api))

const list = (resource) => () => api[resource].list({})
const get = (resource) => (req) =>
  api[resource].get({ hash: decode(req.params.hash) })

export default () => [
  { method: 'GET', path: '/services', handler: list('service') },
  { method: 'GET', path: '/services/:hash', handler: get('service') },

  { method: 'GET', path: '/instances', handler: list('instance') },
  { method: 'GET', path: '/instances/:hash', handler: get('instance') },

  { method: 'GET', path: '/executions', handler: list('execution') },
  { method: 'GET', path: '/executions/:hash', handler: get('execution') },

  { method: 'GET', path: '/processes', handler: list('process') },
  { method: 'GET', path: '/processes/:hash', handler: get('process') },

  { method: 'GET', path: '/runners', handler: list('runner') },
  { method: 'GET', path: '/runners/:hash', handler: get('runner') }
]
