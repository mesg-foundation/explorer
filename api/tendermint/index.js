import { EventEmitter } from 'events'
import RpcClient from 'tendermint/lib/rpc'
import normalizer from './normalizer'
import faucet from './faucet'
import { BECH32_PREFIX } from './cosmos'

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

const status = (req, res) => httpClient.status()

const tx = async (req, res) =>
  normalizer.tx(await httpClient.tx({ hash: `0x${req.params.hash}` }))

const block = async (req, res) => {
  const height = req.params.height
  const [{ block }, { results }] = await Promise.all([
    httpClient.block({ height }),
    httpClient.blockResults({ height })
  ])
  return normalizer.block({
    ...block,
    results
  })
}

const faucetHandler = (req, res) => {
  const url = new URL(req.body.url)
  const paths = url.pathname.split('/')
  const tweetId = paths[paths.length - 1]
  console.log(tweetId)
  // TODO: replace this mock with the twitter query when they accept the account https://developer.twitter.com/en/apps
  // https://api.twitter.com/1.1/statuses/show.json?id=${tweetId}
  const { text } = {
    text: `Requesting faucet funds into ${req.body.address} on the #MESG #testnet http://explorer.testnet.mesg.com via @mesgfoundation`
  }
  const addressRegexp = new RegExp(`^.*(${BECH32_PREFIX}[a-z0-9]*).*$`)
  const address = text.match(addressRegexp)[1]
  return faucet(address, 1_000_000_000_000_000_000) // 1 MESG = 1e18 atto
}

export default () =>
  [
    { method: 'WS', path: '/tx', event: 'tx', emitter: txEmitter },
    { method: 'WS', path: '/block', event: 'block', emitter: blockEmitter },
    { method: 'GET', path: '/status', handler: status },
    { method: 'GET', path: '/tx/:hash', handler: tx },
    { method: 'GET', path: '/block/:height', handler: block },
    process.env.FAUCET_MNEMONIC
      ? { method: 'POST', path: '/faucet', handler: faucetHandler }
      : null
  ].filter((x) => x)
