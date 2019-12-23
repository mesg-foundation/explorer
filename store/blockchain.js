import RpcClient from 'tendermint/lib/rpc'
import { getBlockHash, tmhash } from 'tendermint/lib/hash'
const client = new RpcClient('ws://localhost:26657')

const decode = (str) => Buffer.from(str || '', 'base64').toString()

const txHash = (tx) =>
  tmhash(Buffer.from(tx.tx, 'base64'))
    .toString('hex')
    .toUpperCase()

const convertEvents = (events) =>
  (events || []).map((event) => ({
    type: event.type,
    attributes: event.attributes.map((attribute) => ({
      key: decode(attribute.key),
      value: decode(attribute.value)
    }))
  }))

const convertBlock = (block) => {
  const results = { ...block.results }
  if (results.begin_block) {
    results.begin_block.events = convertEvents(results.begin_block.events)
  }
  return {
    ...block,
    hash: getBlockHash(block.header),
    results
  }
}

const convertTx = (tx) => {
  const hash = txHash(tx)
  const result = { ...tx.result }
  result.events = convertEvents(result.events)
  return {
    ...tx,
    result,
    tx: Buffer.from(tx.tx, 'base64').toString(),
    hash
  }
}

export const state = () => ({
  nodeInfo: {},
  syncInfo: {},
  blocksByHeight: {},
  txsByHash: {}
})

export const getters = {
  nodeInfo: (state) => state.nodeInfo,
  syncInfo: (state) => state.syncInfo,
  blocks: (state) => state.blocksByHeight,
  latestBlock: (state) =>
    Object.keys(state.blocksByHeight).sort((a, b) => b.localeCompare(a))[0],
  txs: (state) => state.txsByHash
}

export const mutations = {
  updateStatus: (state, status) => {
    state.nodeInfo = status.node_info
    state.syncInfo = status.sync_info
  },
  addBlock: (state, block) => {
    const convertedBlock = convertBlock(block)
    state.blocksByHeight = {
      ...state.blocksByHeight,
      [convertedBlock.header.height]: convertedBlock
    }
  },
  addTx: (state, tx) => {
    const convertedTx = convertTx(tx)
    state.txsByHash = {
      ...state.txsByHash,
      [convertedTx.hash]: convertedTx
    }
  }
}

export const actions = {
  sync: async ({ commit }) => {
    const status = await client.status()
    commit('updateStatus', status)
    await client.subscribe({ query: "tm.event = 'NewBlock'" }, (event) =>
      commit('addBlock', event.block)
    )
    await client.subscribe({ query: "tm.event = 'Tx'" }, (event) =>
      commit('addTx', event.TxResult)
    )
  },
  fetchBlock: async ({ commit }, height) => {
    const [{ block }, { results }] = await Promise.all([
      client.block({ height }),
      client.blockResults({ height })
    ])
    commit('addBlock', {
      ...block,
      results
    })
  },
  fetchTx: async ({ commit }, hash) => {
    // TODO: this request doesn't work yet
    // > error converting json params to arguments: illegal base64 data at input byte 64
    const tx = await client.tx({
      hash: Buffer.from(hash, 'hex'),
      prove: false
    })
    commit('addTx', tx)
  }
}
