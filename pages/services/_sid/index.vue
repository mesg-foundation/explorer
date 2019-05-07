<template>
  <ServiceDetails v-if="service" :service="service" :versionHash="versionHash"/>
  <div v-loading="true" v-else></div>
</template>

<script>
import { mapGetters } from 'vuex'
import ServiceDetails from '~/components/Service/Details'

export default {
  components: {
    ServiceDetails
  },
  async fetch({ store, params }) {
    await store.dispatch('fetchService', params.sid)
  },
  computed: {
    ...mapGetters({
      servicesBySid: 'servicesBySid'
    }),
    service() {
      return this.servicesBySid[this.$route.params.sid]
    },
    versionHash() {
      return this.$route.params.hash
        ? this.$route.params.hash
        : this.service.latestVersion
    }
  }
}
</script>
