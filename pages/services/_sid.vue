<template>
  <ServiceDetails
    :name="service.name"
    :sid="service.sid"
    :description="service.description"
    :logo="service.logo"
  />
</template>

<script>
import ServiceDetails from '~/components/ServiceDetails.vue'

export default {
  components: {
    ServiceDetails
  },

  computed: {
    service() {
      const sid = this.$route.params.sid
      return this.$store.state.services.find(service => service.sid === sid)
    }
  }
}
</script>
