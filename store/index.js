import Vuex from 'vuex'
import pluralize from 'pluralize'
import { encode } from '@mesg/api/lib/util/base58'

const createResource = (resourceName, actions) => {
  const _actions = {
    get: async ({ commit }, id) => {
      const res = await fetch(`/api/${pluralize(resourceName)}/${id}`)
      const data = await res.json()
      commit('add', data)
      return data
    },
    list: async ({ commit }) => {
      const res = await fetch(`/api/${pluralize(resourceName)}`)
      const data = await res.json()
      const result = data[pluralize(resourceName)] || []
      result.forEach((d) => commit('add', d))
      return data
    },
    stream: ({ commit }) => {
      // console.info('Streams are not yet implemented')
      // const ws = new WebSocket('ws://localhost:3001')
      // ws.onmessage = (event) => {
      //   const { resource, data } = JSON.parse(event.data)
      //   if (resource !== resourceName) return
      //   commit('add', data)
      // }
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

export default () => {
  const store = new Vuex.Store({
    strict: true,
    modules: {
      services: createResource('service', ['get', 'list']),
      instances: createResource('instance', ['get', 'list']),
      processes: createResource('process', ['get', 'list']),
      runners: createResource('runner', ['get', 'list']),
      executions: createResource('execution', ['get', 'list', 'stream']),
      events: createResource('event', ['stream'])
    }
  })

  return store
}
