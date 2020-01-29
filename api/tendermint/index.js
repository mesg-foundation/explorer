import { EventEmitter } from 'events'
import RpcClient from 'tendermint/lib/rpc'
import normalizer from './normalizer'
// import { getNewWalletFromSeed, signWithPrivateKey } from "@lunie/cosmos-keys"
// import { createSignedTransaction } from '@lunie/cosmos-api'
// import Cosmos from '@lunie/cosmos-js'

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

// const faucet = async (req, res) => {
//   const { address } = req.body
//   const mnemonic = "evidence prize huge cake photo city title execute company release entire bench clog various sniff speed tank mango entry leg whip behind tortoise wing"
//   const { cosmosAddress, privateKey } = getNewWalletFromSeed(mnemonic, "mesgtest", "44'/470'/0'/0/0")

//   Cosmos('localhost', 'mesg-test-01')

//   const sendMsg = {
//     type: `cosmos-sdk/Send`,
//     value: {
//       inputs: [
//         {
//           address: cosmosAddress,
//           coins: [{ denom: 'atto', amount: '10000000' }]
//         }
//       ],
//       outputs: [
//         {
//           address: address,
//           coins: [{ denom: 'atto', amount: '10000000' }]
//         }
//       ]
//     }
//   }

//   const signer = signMessage => signWithPrivateKey(signMessage, Buffer.from(privateKey, 'hex'))

//   const tx = createSignedTransaction({
//     gas: 1000,
//     gasPrices: [{ amount: "10", denom: "atto" }],
//     memo: 'faucet'
//   }, [sendMsg], signer, "mesg-test-01", 0, 12);

//   const txResult = await httpClient.broadcastTxSync(tx)

//   res.json(txResult)
// }

export default () => [
  { method: 'WS', path: '/tx', event: 'tx', emitter: txEmitter },
  { method: 'WS', path: '/block', event: 'block', emitter: blockEmitter },
  { method: 'GET', path: '/status', handler: status },
  { method: 'GET', path: '/tx/:hash', handler: tx },
  { method: 'GET', path: '/block/:height', handler: block }
  // { method: 'POST', path: '/faucet', handler: faucet }
]
