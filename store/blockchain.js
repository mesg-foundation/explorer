import RpcClient from 'tendermint/lib/rpc'
import { getBlockHash, tmhash } from 'tendermint/lib/hash'
const wsClient = new RpcClient('ws://localhost:26657')
const httpClient = new RpcClient('http://localhost:26657')

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

const normalizeTx = (tx) => {
  const result = { ...tx.result, ...tx.tx_result } // result are not the same if it comes from an event or a fetch
  return {
    hash: tx.hash || txHash(tx),
    height: tx.height,
    index: tx.index,
    tx: Buffer.from(tx.tx, 'base64').toString(),
    result: {
      data: result.data,
      log: result.log,
      gasWanted: result.gasWanted || result.gas_wanted,
      gasUsed: result.gasUsed || result.gas_used,
      events: convertEvents(result.events)
    }
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
  txs: (state) => state.txsByHash,
  sortedTxs: (state) =>
    Object.keys(state.txsByHash)
      .map((x) => state.txsByHash[x])
      .sort((a, b) => b.index - a.index) // Sort by index
      .sort((a, b) => b.height.localeCompare(a.height)) // Sort by block
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
    const convertedTx = normalizeTx(tx)
    state.txsByHash = {
      ...state.txsByHash,
      [convertedTx.hash]: convertedTx
    }
  }
}

export const actions = {
  sync: async ({ commit }) => {
    const status = await wsClient.status()
    commit('updateStatus', status)
    await wsClient.subscribe({ query: "tm.event = 'NewBlock'" }, (event) =>
      commit('addBlock', event.block)
    )
    await wsClient.subscribe({ query: "tm.event = 'Tx'" }, (event) =>
      commit('addTx', event.TxResult)
    )
  },
  fetchBlock: async ({ commit }, height) => {
    const [{ block }, { results }] = await Promise.all([
      wsClient.block({ height }),
      wsClient.blockResults({ height })
    ])
    commit('addBlock', {
      ...block,
      results
    })
  },
  fetchTx: async ({ commit }, hash) => {
    // For some reasons the websocket client doesn't work with this parameters. HTTP clients works
    // > error converting json params to arguments: illegal base64 data at input byte 64
    const tx = await httpClient.tx({ hash: `0x${hash}` })
    commit('addTx', tx)
  }
}
