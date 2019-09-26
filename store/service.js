import { encode } from 'mesg-js/lib/util/base58'
// import { ServicePromiseClient } from './protobuf/api/service_grpc_web_pb'
// import {
//   GetServiceRequest,
//   ListServiceRequest
// } from './protobuf/api/service_pb'

// const client = new ServicePromiseClient('http://127.0.0.1:50053', null, null)

const host = 'http://localhost:3001'

export const namespaced = true

export const state = () => ({
  list: {}
})

export const getters = {
  list: (state) => state.list
}

export const mutations = {
  insert: (state, service) => {
    state.list = {
      ...state.list,
      [encode(service.hash)]: {
        ...service,
        hash: encode(service.hash)
      }
    }
  }
}

export const actions = {
  fetchAll: async ({ commit }) => {
    const response = await fetch(`${host}/services`)
    const { services } = await response.json()
    if (!services) return
    services.forEach((service) => commit('insert', service))
    return services
  },
  fetch: async ({ commit }, { hash }) => {
    const response = await fetch(`${host}/services/${hash}`)
    const service = await response.json()
    if (!service) throw new Error(`Cannot find service ${hash}`)
    commit('insert', service)
    return service
  }
}
