import express from 'express'
import cors from 'cors'
import engine from './engine'
import readme from './readme'

const app = express()
app.use(cors())

const apis = [...engine(), ...readme()]

apis.forEach((api) => {
  app[api.method.toLowerCase()](api.path, api.handler)
})

export default {
  path: '/api',
  handler: app
}
