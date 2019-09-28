const app = require('express')()
const mesg = require('mesg-js/lib/api').default('localhost:50052')
const { decode } = require('mesg-js/lib/util/base58')

app.get('/services', async (req, res) => res.json(await mesg.service.list({})))
app.get('/services/:hash', async (req, res) => res.json(await mesg.service.get({ hash: decode(req.params.hash) })))

app.listen(3001, () => console.log('started'))