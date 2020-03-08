<template>
  <v-container fluid>
    <v-card>
      <v-data-table :items="executions" :headers="headers">
        <template v-slot:item.hash="{ value }">
          <nuxt-link :to="`/executions/${value}`">{{ value }}</nuxt-link>
        </template>
        <template v-slot:item.instanceHash="{ value }">
          <nuxt-link :to="`/instances/${value}`">{{ value }}</nuxt-link>
        </template>
        <template v-slot:item.taskKey="{ value }">
          <pre><code>{{ value }}</code></pre>
        </template>
        <template v-slot:item.inputs="{ value }">
          <pre><code>{{ JSON.stringify(value) }}</code></pre>
        </template>
        <template v-slot:item.outputs="{ item }">
          <span v-if="item.error" class="error--text">{{ item.error }}</span>
          <code v-else>{{ JSON.stringify(item.outputs) }}</code>
        </template>
        <template v-slot:item.tags="{ value }">
          <v-chip v-for="tag in value" :key="tag" tag small>{{ tag }}</v-chip>
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
      title: 'Executions'
    }
  },
  computed: {
    ...mapGetters({
      list: 'execution/list'
    }),
    headers() {
      return [
        { text: 'Hash', value: 'hash' },
        { text: 'Instance', value: 'instanceHash' },
        { text: 'Task', value: 'taskKey' },
        { text: 'Inputs', value: 'inputs' },
        { text: 'Outputs', value: 'outputs' },
        { text: 'Tags', value: 'tags' }
      ]
    },
    executions() {
      return Object.keys(this.list).map((x) => this.list[x])
    }
  },
  fetch: ({ store }) => store.dispatch('execution/list')
}
</script>
