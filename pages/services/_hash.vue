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

            <v-card v-if="instances.length" class="mt-4">
              <v-card-title>Instances</v-card-title>
              <List :items="instances" />
            </v-card>

            <v-card v-if="service.repository" class="mt-4">
              <v-card-title>Source repository</v-card-title>
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
import ServiceHeader from '~/components/service/Header'
import CodeCopy from '~/components/CodeCopy'
import List from '~/components/List'
export default {
  components: {
    ServiceHeader,
    CodeCopy,
    List
  },
  head() {
    return {
      title: this.service.name
    }
  },
  computed: {
    ...mapGetters({
      services: 'service/list',
      _instances: 'instance/list'
    }),
    service() {
      return this.services[this.$route.params.hash]
    },
    instances() {
      return Object.keys(this._instances)
        .map((x) => this._instances[x])
        .filter((x) => encode(x.serviceHash) === this.$route.params.hash)
        .map((x) => ({
          key: 'Instance hash',
          value: x.hash,
          to: `/instances/${x.hash}`
        }))
    },
    code() {
      const endpoint = `${process.env.HOST}/api/services/${this.service.hash}`
      return `mesg-cli service:create "$(curl -s ${endpoint})"`
    },
    items() {
      return [
        {
          key: 'Repository',
          value: this.service.repository,
          href: this.service.repository,
          icon: 'mdi-github-circle'
        }
      ]
    }
  },
  fetch: ({ store, params }) => {
    return Promise.all([
      store.dispatch('service/get', params.hash),
      store.dispatch('instance/list')
    ])
  }
}
</script>
