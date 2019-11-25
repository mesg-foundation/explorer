<template>
  <div v-if="service">
    <ServiceHeader :service="service" />
    <v-divider />
    <v-container>
      <v-layout>
        <v-row>
          <v-col sm="8">
            <v-card>
              <v-card-text>
                <nuxt-child :service="service" />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col sm="4">
            <v-card>
              <v-card-title>Add this service</v-card-title>
              <v-card-text class="pt-4">
                <CodeCopy :code="code" class="code-copy" />
              </v-card-text>
            </v-card>

            <v-card class="mt-4">
              <v-card-title>Instances</v-card-title>
              <v-list>
                <v-list-item
                  v-for="instance in instances"
                  :key="instance.hash"
                  :to="`/instances/${instance.hash}`"
                  nuxt
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ instance.hash }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>

            <v-card v-if="service.repository" class="mt-4">
              <v-card-title>Source repository</v-card-title>
              <v-list>
                <v-list-item :href="service.repository">
                  <v-list-item-avatar>
                    <v-icon>mdi-github-circle</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>Github</v-list-item-title>
                    <v-list-item-subtitle>{{
                      service.repository
                    }}</v-list-item-subtitle>
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
import ServiceHeader from '~/components/service/Header'
import CodeCopy from '~/components/CodeCopy'
export default {
  components: {
    ServiceHeader,
    CodeCopy
  },
  head() {
    return {
      title: this.service.name
    }
  },
  computed: {
    ...mapGetters({
      services: 'services/list',
      _instances: 'instances/list'
    }),
    service() {
      return this.services[this.$route.params.hash]
    },
    instances() {
      return Object.keys(this._instances)
        .map((x) => this._instances[x])
        .filter((x) => encode(x.serviceHash) === this.$route.params.hash)
    },
    code() {
      const endpoint = `${process.env.API_ENDPOINT}/services/${this.service.hash}`
      return `mesg-cli service:create "$(curl -s ${endpoint})"`
    }
  },
  fetch: ({ store, params }) => {
    return Promise.all([
      store.dispatch('services/get', params.hash),
      store.dispatch('instances/list')
    ])
  }
}
</script>
