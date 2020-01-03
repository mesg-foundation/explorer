// const { createServer } = require('http')
// const { Server } = require('ws')
const app = require('express')()
const cors = require('cors')
const pluralize = require('pluralize')
const API = require('@mesg/api')
const { decode } = require('@mesg/api/lib/util/base58')

app.use(cors())
// const server = createServer(app)
// const ws = new Server({ server, port: process.env.WS_PORT })
// server.listen(process.env.WS_PORT)
const api = new API(process.env.ENGINE_ENDPOINT || 'engine:50052')

const createListEndpoint = (app, api) => (resource) =>
  app.get(`/${pluralize(resource)}`, async (req, res) => {
    return res.json(await api[resource].list({}))
  })

const createGetEndpoint = (app, api) => (resource) =>
  app.get(`/${pluralize(resource)}/:hash`, async (req, res) =>
    res.json(
      await api[resource].get({
        hash: decode(req.params.hash)
      })
    )
  )

// const createStreamSocket = (ws, api) => (resource) =>
//   api[resource].stream({}).on('data', (data) =>
//     ws.clients.forEach((client) => {
//       client.send(JSON.stringify({ resource, data }))
//     })
//   )

const resourcesList = ['service', 'instance', 'execution', 'process', 'runner']
const resourcesGet = ['service', 'instance', 'execution', 'process', 'runner']
// const resourcesStream = ['execution', 'event']

resourcesList.forEach(createListEndpoint(app, api))
resourcesGet.forEach(createGetEndpoint(app, api))
// resourcesStream.forEach(createStreamSocket(ws, api))

export default app
