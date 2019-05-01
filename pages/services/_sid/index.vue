<template>
  <ServiceDetails v-if="service"
    :name="service.name"
    :sid="service.sid"
    :description="service.description"
    :logo="service.logo"
    :readme="service.readme"
    :versions="service.versions"
    :events="service.events"
    :tasks="service.tasks"
    :owner="service.owner"
    :repository="service.repository"
    :offers="service.offers"
    :purchases="service.purchases"
  />
  <div v-loading="true" v-else></div>
</template>

<script>
import ServiceDetails from '~/components/ServiceDetails'

export default {
  components: {
    ServiceDetails
  },

  computed: {
    service() {
      const sid = this.$route.params.sid
      const hash = this.$route.params.hash
      if (hash) {
        return this.$store.getters.getService(hash)
      }
      return this.$store.getters.getServiceLatest(sid)
    }
  },

  beforeCreate: function() {
    // document.body.className = 'light';
  },

  beforeMount() {
    this.$store.dispatch('fetchService', this.$route.params.sid);
  }
}
</script>
