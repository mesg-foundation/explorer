import pluralize from 'pluralize'

export default (resourceName, actions) => {
  const _actions = {
    async get({ commit }, id) {
      const res = await fetch(
        `${this.$env.HOST}/api/${pluralize(resourceName)}/${id}`
      )
      const data = await res.json()
      commit('add', data)
      return data
    },
    async list({ commit }) {
      const res = await fetch(
        `${this.$env.HOST}/api/${pluralize(resourceName)}`
      )
      const result = await res.json()
      result.forEach((d) => commit('add', d))
      return result
    },
    stream({ commit }) {
      const ws = new WebSocket(`${this.$env.WS_HOST}/api/${resourceName}`)
      ws.onmessage = (event) => commit('add', JSON.parse(event))
    }
  }
  return {
    namespaced: true,
    state: () => ({
      list: {}
    }),
    getters: {
      list: (state) => state.list
    },
    mutations: {
      add(state, resource) {
        state.list = {
          ...state.list,
          [resource.hash]: resource
        }
      }
    },
    actions: actions.reduce(
      (acc, next) => ({
        ...acc,
        [next]: _actions[next]
      }),
      {}
    )
  }
}
