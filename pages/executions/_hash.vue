<template>
  <div v-if="execution">
    <Header>
      <h1 class="display-1">Execution {{ execution.hash }}</h1>
    </Header>
    <v-divider />
    <v-container fluid>
      <v-layout>
        <v-row>
          <v-col sm="8">
            <v-card>
              <List :items="items" />
              <v-card-text>
                <code style="width: 100%;">{{
                  JSON.stringify(execution.inputs, null, 2)
                }}</code>
              </v-card-text>
            </v-card>
            <v-card class="mt-3">
              <v-card-text>
                <span v-if="execution.error" class="error--text">
                  {{ execution.error }}
                </span>
                <code v-else style="width: 100%;">{{
                  JSON.stringify(execution.outputs, null, 2)
                }}</code>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col sm="4"></v-col>
        </v-row>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '~/components/Header'
import List from '~/components/List'
export default {
  components: { Header, List },
  head() {
    return {
      title: `Execution #${this.$route.params.hash}`
    }
  },
  computed: {
    ...mapGetters({
      executions: 'execution/list',
      services: 'service/list',
      instances: 'instance/list'
    }),
    execution() {
      return this.executions[this.$route.params.hash]
    },
    instance() {
      return this.instances[this.execution.instanceHash]
    },
    service() {
      return this.services[this.instance.serviceHash]
    },
    items() {
      return [
        {
          key: 'Service name',
          value: this.service.name,
          to: `/services/${this.service.hash}`
        },
        {
          key: 'Instance hash',
          value: this.instance.hash,
          to: `/instances/${this.instance.hash}`
        },
        { key: 'Tags', value: (this.execution.tags || []).join(', ') },
        { key: 'Task', value: this.execution.taskKey }
      ]
    }
  },
  fetch: async ({ store, params }) => {
    const execution = await store.dispatch('execution/get', params.hash)
    const instance = await store.dispatch(
      'instance/get',
      execution.instanceHash
    )
    await store.dispatch('service/get', instance.serviceHash)
  }
}
</script>
