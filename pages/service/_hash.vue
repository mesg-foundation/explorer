<template>
  <div>
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
              <v-card-title>Start this service</v-card-title>
              <v-card-text class="pt-4">
                <CodeCopy
                  :code="`mesg-cli service:start ${service.hash}`"
                  class="code-copy"
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ServiceHeader from '~/components/service/Header'
import CodeCopy from '~/components/CodeCopy'
export default {
  components: {
    ServiceHeader,
    CodeCopy
  },
  computed: {
    ...mapGetters({
      services: 'service/list'
    }),
    service() {
      return this.services[this.$route.params.hash]
    }
  },
  fetch: async ({ store, params }) => {
    await store.dispatch('service/fetch', params)
  }
}
</script>
