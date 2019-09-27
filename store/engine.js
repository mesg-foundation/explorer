export const namespace = true

export const state = () => ({
  endpoint: 'http://localhost:3001'
})

export const getters = {
  getEndpoint: (state) => state.endpoint
}

export const mutations = {
  updateEndpoint: (state, endpoint) => {
    state.endpoint = endpoint
  }
}
