<template>
  <v-container>
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
import { encode } from '@mesg/api/lib/util/base58'
export default {
  computed: {
    ...mapGetters({
      list: 'processes/list'
    }),
    headers() {
      return [
        { text: 'Hash', value: 'hash' },
        { text: 'Key', value: 'key' },
        { text: 'Trigger', value: 'trigger' },
        { text: 'Tasks', value: 'tasks' }
      ]
    },
    processes() {
      return Object.keys(this.list).map((x) => this.list[x])
    }
  },
  fetch: ({ store }) => store.dispatch('processes/list'),
  methods: {
    encode,
    trigger(process) {
      const eventTrigger = process.nodes.find((x) => x.event)
      const resultTrigger = process.nodes.find((x) => x.result)
      return eventTrigger ? eventTrigger.event : resultTrigger.result
    },
    tasks(process) {
      return process.nodes.filter((x) => x.task)
    }
  }
}
</script>
