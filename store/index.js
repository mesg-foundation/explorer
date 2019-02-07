import * as uuidv4 from 'uuid/v4'
import * as pkg from '~/package'
import { CoreClient } from '~/assets/proto/api-core_grpc_web_pb.js'
import { ListenResultRequest, ExecuteTaskRequest } from '~/assets/proto/api-core_pb.js'

const client = new CoreClient(pkg.endpoint);

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
      var executeInterval;
      const id = uuidv4()

      const resultReq = new ListenResultRequest()
      resultReq.setServiceid('marketplace')
      resultReq.setTaskfilter('listServices')
      resultReq.setTagfiltersList([id])
      
      const stream = client.listenResult(resultReq)
      stream.on('error', (err) => { console.log(err) })
      stream.on('status', (status) => { console.log(status) })
      stream.on('data', (data) => {
        const extendedServices = JSON.parse(data.getOutputdata()).services
        const services = extendedServices.map((service) => {
          const s = service.versions[0].metadata.service
          const versions = service.versions.map((version) => {
            return {
              number: version.metadata.version,
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
            usid: service.sid,
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
        stream.cancel()
        clearInterval(executeInterval)
        commit('updateServices', services)
        commit('updateLoading', false)
        resolve()
      })

      executeInterval = setInterval(() => {
        const execReq = new ExecuteTaskRequest()
        execReq.setServiceid("marketplace")
        execReq.setTaskkey("listServices")
        execReq.setInputdata("{}")
        execReq.setExecutiontagsList([id])
        client.executeTask(execReq, {}, function(){})
      }, 250)
    })
  }
}
