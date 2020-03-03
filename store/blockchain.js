import { tmhash } from 'tendermint/lib/hash'

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
  updateStatus(state, status) {
    state.nodeInfo = status.node_info
    state.syncInfo = status.sync_info
  },
  addBlock(state, data) {
    if (!data) return
    state.blocksByHeight = {
      ...state.blocksByHeight,
      [data.block.header.height]: {
        ...data.block,
        result_begin_block: data.result_begin_block,
        result_end_block: data.result_end_block,
        txs_results: data.txs_results
      }
    }
  },
  addTx(state, tx) {
    if (!tx) return
    if (tx.TxResult) tx = tx.TxResult
    const hash =
      tx.hash ||
      tmhash(Buffer.from(tx.tx, 'base64'))
        .toString('hex')
        .toUpperCase()
    const result = tx.result || tx.tx_result || {}
    state.txsByHash = {
      ...state.txsByHash,
      [hash]: {
        hash,
        height: tx.height,
        index: tx.index,
        tx: tx.tx,
        result: {
          code: result.code,
          codespace: result.codespace,
          data: result.data,
          log: result.log,
          info: result.info,
          gas_wanted: result.gas_wanted || result.gasWanted,
          gas_used: result.gas_used || result.gasUsed,
          events: result.events || []
        }
      }
    }
  }
}

export const actions = {
  async sync({ commit, dispatch }) {
    const blockWS = new WebSocket(`${this.$env.WS_HOST}/api/block`)
    blockWS.onmessage = (event) => commit('addBlock', JSON.parse(event.data))

    const txWS = new WebSocket(`${this.$env.WS_HOST}/api/tx`)
    txWS.onmessage = (event) => commit('addTx', JSON.parse(event.data))

    await dispatch('updateStatus')
  },
  async updateStatus({ commit }) {
    const res = await fetch(`${this.$env.HOST}/api/status`)
    const data = await res.json()
    commit('updateStatus', data)
  },
  async fetchBlock({ commit }, height) {
    const res = await fetch(`${this.$env.HOST}/api/block/${height}`)
    const data = await res.json()
    commit('addBlock', data)
  },
  async fetchTx({ commit }, hash) {
    const res = await fetch(`${this.$env.HOST}/api/tx/${hash}`)
    const data = await res.json()
    commit('addTx', data)
  },
  async faucet(_, { url, address }) {
    const res = await fetch(`${this.$env.HOST}/api/faucet`, {
      method: 'POST',
      body: JSON.stringify({ url, address }),
      headers: { 'Content-Type': 'application/json' }
    })
    return res.json()
  },
  async account(_, { address }) {
    const res = await fetch(`${this.$env.HOST}/api/auth/accounts/${address}`)
    const data = await res.json()
    return data.result
  }
}
