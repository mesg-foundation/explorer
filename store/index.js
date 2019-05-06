export const state = () => ({
  search: '',
  loading: true,
  services: [],
  serviceList: [],
})

export const getters = {
  getService: (state) => (hash) => {
    const service = state.services.find(s => {
      return s.versions.find((version) => {
        console.log(version)
        return version.versionHash === hash
      })
    })

    if (!service || !service.versions || service.versions.length === 0) return

    const manifestData = service.versions.find((version) => {
      return version.versionHash === hash
    }).manifestData
    if (!manifestData) return

    const s = manifestData.service
    if (!s || !s.definition) return

    const versions = service.versions.map((version) => ({
      hash: version.versionHash
    }))

    return {
      ...s.definition,
      readme: s.readme,
      versions: versions,
      owner: service.owner,
      offers: service.offers,
      purchases: service.purchases
    }
  },

  getServiceLatest: (state, getters) => (sid) => {
    const service = state.services.find(s => s.sid == sid)
    if (!service) return
    const hash = service.versions[service.versions.length - 1].versionHash
    return getters.getService(hash)
  },
}

export const mutations = {
  updateSearch(state, query) {
    state.search = query
  },

  cacheService(state, service) {
    const i = state.services.map((s) => s.sid).indexOf(service.sid);
    if (i === -1) {
      state.services.push(service)
    } else {
      state.services[i] = service
    }
  },

  updateServiceList(state, services) {
    state.serviceList = services
  },

  updateLoading(state, status) {
    state.loading = status
  }
}

export const actions = {
  fetchService({ commit }, sid) {
    return new Promise((resolve) => {
      fetch('https://marketplace.app.mesg.com/services/' + sid)
        .then((resp) => { return resp.json() })
        .then((service) => {
          commit('cacheService', service)
          commit('updateLoading', false)
          resolve()
        })
    })
  },

  fetchServices({ commit }) {
    return new Promise((resolve) => {
      fetch('https://marketplace.app.mesg.com/services')
        .then((resp) => { return resp.json() })
        .then(({ services }) => {
          commit('updateServiceList', services)
          commit('updateLoading', false)
          resolve()
        })
    })
  }
}

