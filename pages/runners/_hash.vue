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
                    <v-list-item-subtitle>Instance Hash</v-list-item-subtitle>
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
      runners: 'runners/list',
      services: 'services/list',
      instances: 'instances/list'
    }),
    runner() {
      return this.runners[this.$route.params.hash]
    },
    instance() {
      return this.instances[encode(this.runner.instanceHash)]
    },
    service() {
      return this.services[encode(this.instance.serviceHash)]
    }
  },
  fetch: async ({ store, params }) => {
    const runner = await store.dispatch('runners/get', params.hash)
    const instance = await store.dispatch(
      'instances/get',
      encode(runner.instanceHash)
    )
    return store.dispatch('services/get', encode(instance.serviceHash))
  },
  methods: { encode }
}
</script>
