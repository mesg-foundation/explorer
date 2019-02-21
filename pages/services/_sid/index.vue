<template>
  <ServiceDetails v-if="service"
    :name="service.name"
    :sid="service.sid"
    :description="service.description"
    :logo="service.logo"
    :readme="service.readme"
    :versions="service.versions"
    :variables="service.variables"
    :events="service.events"
    :tasks="service.tasks"
    :owner="service.owner"
    :repository="service.repository"
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
      return this.$store.state.services.find(service => service.sid === sid)
    }
  },

  beforeCreate: function() {
    // document.body.className = 'light';
  }
}
</script>
