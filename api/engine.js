const LCD = require('@mesg/api/lib/lcd')

const lcd = new LCD(`http://${process.env.ENGINE_HOST}:1317`)

export default () => [
  {
    method: 'GET',
    path: '/services',
    handler: () => lcd.service.list()
  },
  {
    method: 'GET',
    path: '/services/:hash',
    handler: (req) => lcd.service.get(req.params.hash)
  },
  {
    method: 'GET',
    path: '/instances',
    handler: () => lcd.instance.list()
  },
  {
    method: 'GET',
    path: '/instances/:hash',
    handler: (req) => lcd.instance.get(req.params.hash)
  },
  {
    method: 'GET',
    path: '/executions',
    handler: () => lcd.execution.list()
  },
  {
    method: 'GET',
    path: '/executions/:hash',
    handler: (req) => lcd.execution.get(req.params.hash)
  },
  {
    method: 'GET',
    path: '/processes',
    handler: () => lcd.process.list()
  },
  {
    method: 'GET',
    path: '/processes/:hash',
    handler: (req) => lcd.process.get(req.params.hash)
  },
  {
    method: 'GET',
    path: '/runners',
    handler: () => lcd.runner.list()
  },
  {
    method: 'GET',
    path: '/runners/:hash',
    handler: (req) => lcd.runner.get(req.params.hash)
  }
]
