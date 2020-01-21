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
  addBlock(state, block) {
    state.blocksByHeight = {
      ...state.blocksByHeight,
      [block.header.height]: block
    }
  },
  addTx(state, tx) {
    state.txsByHash = {
      ...state.txsByHash,
      [tx.hash]: tx
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
  }
}
