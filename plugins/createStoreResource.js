import pluralize from 'pluralize'
import { encode } from '@mesg/api/lib/util/base58'

export default (resourceName, actions) => {
  const _actions = {
    get: async ({ commit }, id) => {
      const res = await fetch(
        `${process.env.HOST}/api/${pluralize(resourceName)}/${id}`
      )
      const data = await res.json()
      commit('add', data)
      return data
    },
    list: async ({ commit }) => {
      const res = await fetch(
        `${process.env.HOST}/api/${pluralize(resourceName)}`
      )
      const data = await res.json()
      const result = data[pluralize(resourceName)] || []
      result.forEach((d) => commit('add', d))
      return data
    },
    stream: ({ commit }) => {
      const ws = new WebSocket(`${process.env.WS_HOST}/api/${resourceName}`)
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
      add: (state, resource) => {
        const hash = encode(resource.hash)
        state.list = {
          ...state.list,
          [hash]: {
            ...resource,
            hash
          }
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
