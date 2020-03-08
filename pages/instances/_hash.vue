<template>
  <div v-if="instance">
    <Header>
      <h1 class="display-1">Instance {{ instance.hash }}</h1>
    </Header>
    <v-divider />
    <v-container fluid>
      <v-layout>
        <v-row>
          <v-col sm="8">
            <v-card>
              <List :items="items" />
            </v-card>
          </v-col>
          <v-col sm="4">
            <v-card v-if="runners.length">
              <v-card-title>Runners</v-card-title>
              <List :items="runners" />
            </v-card>
          </v-col>
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
      title: `Instance #${this.$route.params.hash}`
    }
  },
  computed: {
    ...mapGetters({
      instances: 'instance/list',
      services: 'service/list',
      _runners: 'runner/list'
    }),
    instance() {
      return this.instances[this.$route.params.hash]
    },
    runners() {
      return Object.keys(this._runners)
        .map((x) => this._runners[x])
        .filter((x) => x.instanceHash === this.$route.params.hash)
        .map((x) => ({
          key: "Runner's address",
          value: x.address,
          to: `/runners/${x.hash}`
        }))
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
        { key: 'Environment hash', value: this.instance.envHash }
      ]
    }
  },
  fetch: async ({ store, params }) => {
    const instance = await store.dispatch('instance/get', params.hash)
    return Promise.all([
      store.dispatch('service/get', instance.serviceHash),
      store.dispatch('runner/list')
    ])
  }
}
</script>
