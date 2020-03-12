<template>
  <v-container fluid>
    <v-card>
      <v-data-table :items="processes" :headers="headers">
        <template v-slot:item.hash="{ value }">
          <nuxt-link :to="`/processes/${value}`">{{ value }}</nuxt-link>
        </template>
        <template v-slot:item.trigger="{ item }">
          {{ trigger(item).eventKey || trigger(item).taskKey }}
        </template>
        <template v-slot:item.tasks="{ item }">
          {{ tasks(item).length }}
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  head() {
    return {
      title: 'Processes'
    }
  },
  computed: {
    ...mapGetters({
      list: 'process/list'
    }),
    headers() {
      return [
        { text: 'Hash', value: 'hash' },
        { text: 'Name', value: 'name' },
        { text: 'Trigger', value: 'trigger' },
        { text: 'Tasks', value: 'tasks' }
      ]
    },
    processes() {
      return Object.keys(this.list).map((x) => this.list[x])
    }
  },
  fetch: ({ store }) => store.dispatch('process/list'),
  methods: {
    trigger(process) {
      const eventTrigger = process.nodes.find(
        (x) => x.Type.type === 'mesg.types.Process_Node_Event_'
      )
      const resultTrigger = process.nodes.find(
        (x) => x.Type.type === 'mesg.types.Process_Node_Result_'
      )
      return eventTrigger
        ? eventTrigger.Type.value.event
        : resultTrigger.Type.value.result
    },
    tasks(process) {
      return process.nodes
        .filter((x) => x.Type.type === 'mesg.types.Process_Node_Task_')
        .map((x) => x.Type.value.task)
    }
  }
}
</script>
