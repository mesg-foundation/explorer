import RpcClient from 'tendermint/lib/rpc'
import { getBlockHash } from 'tendermint/lib/hash'
const client = new RpcClient('ws://localhost:26657')

const decode = (str) => {
  if (!str) {
    return ''
  }
  return typeof Buffer === 'function'
    ? Buffer.from(str, 'base64').toString()
    : atob
}

const convertBlock = (block) => {
  let results = {}
  if (block.results) {
    const events = (block.results.begin_block.events || []).map((event) => ({
      type: event.type,
      attributes: event.attributes.map((attribute) => ({
        key: decode(attribute.key),
        value: decode(attribute.value)
      }))
    }))
    results = {
      ...results,
      begin_block: {
        ...results.begin_block,
        events
      }
    }
  }
  return {
    ...block,
    hash: getBlockHash(block.header),
    results
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
    state.blocksByHeight = {
      ...state.blocksByHeight,
      [block.header.height]: convertBlock(block)
    }
  },
  addTx: (state, tx) => {
    state.txsByHash = {
      ...state.txsByHash,
      [tx.tx]: tx
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
    const tx = await client.tx({ hash })
    commit('addTx', tx)
  }
}
