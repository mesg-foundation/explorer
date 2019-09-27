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
              <v-card-title>Start this service</v-card-title>
              <v-card-text class="pt-4">
                <CodeCopy
                  :code="`mesg-cli service:start ${service.hash}`"
                  class="code-copy"
                />
              </v-card-text>
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
import refreshable from '~/pages/refreshable'
import ServiceHeader from '~/components/service/Header'
import CodeCopy from '~/components/CodeCopy'
export default {
  components: {
    ServiceHeader,
    CodeCopy
  },
  mixins: [refreshable],
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
