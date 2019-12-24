<template>
  <div v-if="runner">
    <Header>
      <h1 class="display-1">Runner {{ runner.hash }}</h1>
    </Header>
    <v-divider />
    <v-container>
      <v-layout>
        <v-row>
          <v-col sm="8">
            <v-card>
              <List :items="items" />
            </v-card>
          </v-col>
        </v-row>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { encode } from '@mesg/api/lib/util/base58'
import Header from '~/components/Header'
import List from '~/components/List'
export default {
  components: { Header, List },
  computed: {
    ...mapGetters({
      runners: 'runner/list',
      services: 'service/list',
      instances: 'instance/list'
    }),
    runner() {
      return this.runners[this.$route.params.hash]
    },
    instance() {
      return this.instances[encode(this.runner.instanceHash)]
    },
    service() {
      return this.services[encode(this.instance.serviceHash)]
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
        }
      ]
    }
  },
  fetch: async ({ store, params }) => {
    const runner = await store.dispatch('runner/get', params.hash)
    const instance = await store.dispatch(
      'instance/get',
      encode(runner.instanceHash)
    )
    return store.dispatch('service/get', encode(instance.serviceHash))
  },
  methods: { encode }
}
</script>
