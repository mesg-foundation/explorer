import { EventEmitter } from 'events'
import RpcClient from 'tendermint/lib/rpc'
import normalizer from './normalizer'

const wsClient = new RpcClient(`ws://${process.env.ENGINE_HOST}:26657`)
const httpClient = new RpcClient(`http://${process.env.ENGINE_HOST}:26657`)

const txEmitter = new EventEmitter()
const blockEmitter = new EventEmitter()

wsClient.subscribe({ query: "tm.event = 'NewBlock'" }, (event) =>
  blockEmitter.emit('data', normalizer.block(event.block))
)

wsClient.subscribe({ query: "tm.event = 'Tx'" }, (event) =>
  txEmitter.emit('data', normalizer.tx(event.TxResult))
)

const status = async (req, res) => res.json(await httpClient.status())

const tx = async (req, res) =>
  res.json(normalizer.tx(await httpClient.tx({ hash: `0x${req.params.hash}` })))

const block = async (req, res) => {
  const height = req.params.height
  const [{ block }, { results }] = await Promise.all([
    httpClient.block({ height }),
    httpClient.blockResults({ height })
  ])
  res.json(
    normalizer.block({
      ...block,
      results
    })
  )
}

export default () => [
  { method: 'WS', path: '/tx', event: 'tx', emitter: txEmitter },
  { method: 'WS', path: '/block', event: 'block', emitter: blockEmitter },
  { method: 'GET', path: '/status', handler: status },
  { method: 'GET', path: '/tx/:hash', handler: tx },
  { method: 'GET', path: '/block/:height', handler: block }
]
