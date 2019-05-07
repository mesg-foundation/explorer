export const state = () => ({
  search: '',
  loading: true,
  services: [],
  versionByHash: {},
  servicesBySid: {}
})

export const getters = {
  versionsByHash: state => state.versionByHash,
  servicesBySid: state => state.servicesBySid,
  services: state => state.services
}

export const mutations = {
  updateSearch(state, query) {
    state.search = query
  },

  updateService(state, service) {
    const i = state.services.map(s => s.sid).indexOf(service.sid);
    const serviceToInsert = {
      ...service,
      offers: service.offers.filter(x => x.active).sort((a, b) => parseInt(a.price, 10) - parseInt(b.price, 10)),
      latestVersion: [...service.versions].sort((a, b) => new Date(b.createTime) - new Date(a.createTime))[0].versionHash
    }
    if (i === -1) {
      state.services.push(serviceToInsert)
    } else {
      state.services[i] = serviceToInsert
    }
    state.versionByHash = service.versions.map(x => x.versionHash).reduce((prev, versionHash) => ({
      ...prev,
      [versionHash]: service.versions.find(x => x.versionHash === versionHash)
    }), { ...state.versionByHash })

    state.servicesBySid = {
      ...state.servicesBySid,
      [service.sid]: serviceToInsert
    }
  },

  updateLoading(state, status) {
    state.loading = status
  }
}

export const actions = {
  async fetchService({ commit }, sid) {
    const resp = await fetch('https://marketplace.app.mesg.com/services/' + sid)
    const service = await resp.json()
    commit('updateService', service)
    commit('updateLoading', false)
    return service
  },

  async fetchServices({ commit }) {
    const resp = await fetch('https://marketplace.app.mesg.com/services')
    const services = await resp.json()
    services.forEach(service => commit('updateService', service))
    commit('updateLoading', false)
    return services
  }
}

