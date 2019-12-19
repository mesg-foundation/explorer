<template>
  <div v-if="instance">
    <Header>
      <h1 class="display-1">Instance {{ instance.hash }}</h1>
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
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{
                      encode(instance.envHash)
                    }}</v-list-item-title>
                    <v-list-item-subtitle
                      >Environment Hash</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-col sm="4">
            <v-card v-if="runners.length">
              <v-card-title>Runners</v-card-title>
              <v-list>
                <v-list-item
                  v-for="runner in runners"
                  :key="runner.hash"
                  :to="`/runners/${runner.hash}`"
                  nuxt
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ runner.address }}</v-list-item-title>
                    <v-list-item-subtitle
                      >Runner's address</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list>
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
export default {
  components: { Header },
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
        .filter((x) => encode(x.instanceHash) === this.$route.params.hash)
    },
    service() {
      return this.services[encode(this.instance.serviceHash)]
    }
  },
  fetch: async ({ store, params }) => {
    const instance = await store.dispatch('instance/get', params.hash)
    return Promise.all([
      store.dispatch('service/get', encode(instance.serviceHash)),
      store.dispatch('runner/list')
    ])
  },
  methods: { encode }
}
</script>
