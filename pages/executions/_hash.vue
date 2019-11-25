<template>
  <div v-if="execution">
    <Header>
      <h1 class="display-1">Execution {{ execution.hash }}</h1>
    </Header>
    <v-divider />
    <v-container>
      <v-layout>
        <v-row>
          <v-col sm="8">
            <v-card>
              <v-list>
                <v-list-item :to="`/services/${service.hash}`" nuxt>
                  <v-list-item-content>
                    <v-list-item-title>{{ service.name }}</v-list-item-title>
                    <v-list-item-subtitle>Service name</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item :to="`/instances/${instance.hash}`" nuxt>
                  <v-list-item-content>
                    <v-list-item-title>{{ instance.hash }}</v-list-item-title>
                    <v-list-item-subtitle>Instance hash</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{
                      execution.tags.join(', ')
                    }}</v-list-item-title>
                    <v-list-item-subtitle>Tags</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{
                      execution.taskKey
                    }}</v-list-item-title>
                    <v-list-item-subtitle>Task</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-card-text>
                <code style="width: 100%;">
                  {{ JSON.stringify(execution.inputs, null, 2) }}
                </code>
              </v-card-text>
            </v-card>
            <v-card class="mt-3">
              <v-card-text>
                <span v-if="execution.error" class="error--text">{{
                  execution.error
                }}</span>
                <code v-else style="width: 100%;">
                  {{ JSON.stringify(execution.outputs, null, 2) }}
                </code>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col sm="4"> </v-col>
        </v-row>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { encode } from '@mesg/api/lib/util/base58'
import Header from '~/components/Header'
export default {
  components: { Header },
  computed: {
    ...mapGetters({
      executions: 'executions/list',
      services: 'services/list',
      instances: 'instances/list'
    }),
    execution() {
      return this.executions[this.$route.params.hash]
    },
    instance() {
      return this.instances[encode(this.execution.instanceHash)]
    },
    service() {
      return this.services[encode(this.instance.serviceHash)]
    }
  },
  fetch: async ({ store, params }) => {
    const execution = await store.dispatch('executions/get', params.hash)
    const instance = await store.dispatch(
      'instances/get',
      encode(execution.instanceHash)
    )
    await store.dispatch('services/get', encode(instance.serviceHash))
  },
  methods: { encode }
}
</script>
