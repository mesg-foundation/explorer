import { encode } from 'mesg-js/lib/util/base58'

export const namespaced = true

export const state = () => ({
  list: {}
})

export const getters = {
  list: (state) => state.list,
  orderedList: (state) => Object.keys(state.list).map((x) => state.list[x])
}

export const mutations = {
  reset: (state) => {
    state.list = {}
  },
  insert: (state, service) => {
    state.list = {
      ...state.list,
      [encode(service.hash)]: {
        ...service,
        hash: encode(service.hash),
        events: service.events ? service.events : [],
        tasks: service.tasks ? service.tasks : [],
        dependencies: service.dependencies ? service.dependencies : []
      }
    }
  }
}

export const actions = {
  fetchAll: async ({ commit, rootGetters }) => {
    const endpoint = `${rootGetters['engine/getEndpoint']}/services`
    const response = await fetch(endpoint)
    const { services } = await response.json()
    if (!services) return
    services.forEach((service) => commit('insert', service))
    return services
  },
  fetch: async ({ commit, rootGetters, dispatch }, { hash }) => {
    const serviceEndpoint = [
      rootGetters['engine/getEndpoint'],
      'services',
      hash
    ].join('/')
    const response = await fetch(serviceEndpoint)
    const service = await response.json()
    if (!service) throw new Error(`Cannot find service ${hash}`)
    service.readme = await dispatch('fetchReadme', service.source)
    commit('insert', service)
    return service
  },
  fetchReadme: async ({ rootGetters }, hash) => {
    const readmeEndpoint = [
      rootGetters['engine/getEndpoint'],
      'readme',
      hash
    ].join('/')
    const readme = await fetch(readmeEndpoint)
    return readme.text()
  }
}
