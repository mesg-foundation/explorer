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
  fetchAll: async ({ commit }) => {
    const response = await fetch(`${process.env.API_ENDPOINT}/services`)
    const { services } = await response.json()
    if (!services) return
    services.forEach((service) => commit('insert', service))
    return services
  },
  fetch: async ({ commit, dispatch }, { hash }) => {
    const response = await fetch(`${process.env.API_ENDPOINT}/services/${hash}`)
    const service = await response.json()
    if (!service) throw new Error(`Cannot find service ${hash}`)
    service.readme = await dispatch('fetchReadme', service.source)
    commit('insert', service)
    return service
  },
  fetchReadme: async (_, hash) => {
    const readme = await fetch(`${process.env.API_ENDPOINT}/readme/${hash}`)
    return readme.text()
  }
}
