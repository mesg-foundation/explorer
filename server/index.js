const app = require('express')()
const cors = require('cors')
const mesg = require('mesg-js/lib/api').default('localhost:50052')
const { decode } = require('mesg-js/lib/util/base58')
const getReadme = require('./readme')

app.use(cors())

app.get('/services', async (req, res) => res.json(await mesg.service.list({})))
app.get('/services/:hash', async (req, res) => res.json(await mesg.service.get({ hash: decode(req.params.hash) })))
app.get('/readme/:hash', async (req, res) => res.send(await getReadme(req.params.hash)))

app.listen(3001, () => console.log('started'))