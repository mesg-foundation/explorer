import * as uuidv4 from 'uuid/v4'
import * as pkg from '~/package'
import { CoreClient } from '~/assets/proto/api-core_grpc_web_pb.js'
import { ListenResultRequest, ExecuteTaskRequest } from '~/assets/proto/api-core_pb.js'

const client = new CoreClient(pkg.endpoint);

export const state = () => ({
  search: '',
  services: []
})

export const mutations = {
  updateSearch (state, query) {
    state.search = query
  },

  updateServices (state, services) {
    state.services = services
  }
}

// export default {
//   async fetch ({ store, params }) {
//     await store.dispatch('fetchServices');
//   }
// }

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
          return {
            usid: service.sid,
            sid: s.definition.sid,
            name: s.definition.name,
            description: s.definition.description,
            logo: s.definition.logo,
            readme: s.readme
          }
        })
        stream.cancel()
        clearInterval(executeInterval)
        commit('updateServices', services)
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
