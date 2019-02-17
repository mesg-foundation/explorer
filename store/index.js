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
        .then((extendedServices) => {
          const services = extendedServices
            .map((service) => {
              if (service.versions.length === 0) return

              const s = service.versions[0].manifest
              const versions = service.versions.map((version) => {
                return {
                  number: version.manifest.version,
                  hash: version.hash
                }
              })

              const variables = {}
              if (s.definition.configuration && s.definition.configuration.env) {
                const vars = s.definition.configuration.env.map((variable) => {
                  const parsedVar = variable.split('=')
                  const name = parsedVar[0]
                  const value = parsedVar.length == 2 ? parsedVar[1] : ''
                  return { name, value }
                })
                variables['service'] = vars
              }

              if (s.definition.dependencies) {
                Object.keys(s.definition.dependencies).forEach((dependency) => {
                  const vars = s.definition.dependencies[dependency].env.map((variable) => {
                    const parsedVar = variable.split('=')
                    const name = parsedVar[0]
                    const value = parsedVar.length == 2 ? parsedVar[1] : ''
                    return { name, value }
                  })
                  variables[dependency] = vars
                })
              }
              
              return {
                usid: service.sidHash,
                sid: s.definition.sid,
                name: s.definition.name,
                description: s.definition.description,
                logo: s.definition.logo,
                readme: s.readme,
                versions: versions,
                variables: variables,
                events: s.definition.events,
                tasks: s.definition.tasks,
                owner: service.owner,
                repository: s.definition.repository,
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
