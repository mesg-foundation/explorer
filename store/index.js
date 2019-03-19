export const state = () => ({
  search: '',
  loading: true,
  services: []
})

export const mutations = {
  updateSearch (state, query) {
    state.search = query
  },

  updateServices (state, services) {
    state.services = services
  },

  updateLoading (state, status) {
    state.loading = status
  }
}

export const actions = {
  fetchServices ({ commit }) {
    return new Promise((resolve, reject)=>{
      fetch('https://application-marketplace.mesg.com/services')
        .then((resp) => { return resp.json() })
        .then((resp) => {
          const services = resp.services
            .map((service) => {
              if (!service.versions || service.versions.length === 0) return

              const manifestData = service.versions[service.versions.length-1].manifestData
              if (!manifestData) return

              const s = manifestData.service
              if (!s || !s.definition) return

              const versions = service.versions.map((version) => ({
                hash: version.versionHash
              }))

              const variables = {}
              const definition = s.definition
              const configuration = definition.configuration

              if (configuration && configuration.env) {
                const vars = configuration.env.map((variable) => {
                  const parsedVar = variable.split('=')
                  const name = parsedVar[0]
                  const value = parsedVar.length == 2 ? parsedVar[1] : ''
                  return { name, value }
                })
                variables['service'] = vars
              }

              if (definition.dependencies) {
                Object.keys(definition.dependencies).forEach((name) => {
                  const dependency = definition.dependencies[name]
                  if (!dependency.env) return
                  const vars = dependency.env.map((variable) => {
                    const parsedVar = variable.split('=')
                    const name = parsedVar[0]
                    const value = parsedVar.length == 2 ? parsedVar[1] : ''
                    return { name, value }
                  })
                  variables[name] = vars
                })
              }
              
              return {
                sid: definition.sid,
                name: definition.name,
                description: definition.description,
                logo: definition.logo,
                readme: s.readme,
                versions: versions,
                variables: variables,
                events: definition.events,
                tasks: definition.tasks,
                owner: service.owner,
                repository: definition.repository,
                offers: service.offers,
                purchases: service.purchases
              }
            })
            .filter((item) => item)

          commit('updateServices', services)
          commit('updateLoading', false)
          resolve()
        })
    })
  }
}
