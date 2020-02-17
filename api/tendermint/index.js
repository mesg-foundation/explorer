import { EventEmitter } from 'events'
import RpcClient from 'tendermint/lib/rpc'
import Twitter from 'twitter'
import faucet from './faucet'
import { BECH32_PREFIX } from './cosmos'

const httpClient = new RpcClient(`http://${process.env.ENGINE_HOST}:26657`)

const txEmitter = new EventEmitter()
const blockEmitter = new EventEmitter()

const MESG = 1_000_000_000_000_000_000 // 1 MESG = 1e18 atto
const addressRegexp = new RegExp(`^.*(${BECH32_PREFIX}[a-z0-9]*).*$`)

const twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

const blocks = new RpcClient(`ws://${process.env.ENGINE_HOST}:26657`)
blocks.on('error', (e) => {
  throw e
})
blocks.subscribe({ query: "tm.event = 'NewBlock'" }, (event) =>
  blockEmitter.emit('data', event)
)

const txs = new RpcClient(`ws://${process.env.ENGINE_HOST}:26657`)
txs.on('error', (e) => {
  throw e
})
txs.subscribe({ query: "tm.event = 'Tx'" }, (event) =>
  txEmitter.emit('data', event)
)

const status = () => httpClient.status()

const tx = (req) => httpClient.tx({ hash: `0x${req.params.hash}` })

const block = (req) =>
  Promise.all([
    httpClient.block({ height: req.params.height }),
    httpClient.blockResults({ height: req.params.height })
  ]).then(([block, result]) => ({
    block: block.block,
    result_begin_block: {
      events: result.begin_block_events
    },
    result_end_block: {
      validator_updates: result.validator_updates || []
    },
    txs_results: result.txs_results || []
  }))

const faucetHandler = async (req) => {
  const url = new URL(req.body.url)
  const paths = url.pathname.split('/')
  const tweetId = paths[paths.length - 1]
  const { text } = await twitter.get('statuses/show', { id: tweetId })
  const address = text.match(addressRegexp)[1]
  return faucet(address, 1 * MESG)
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
