<template>
  <ServiceDetails v-if="service"
    :name="service.name"
    :sid="service.sid"
    :description="service.description"
    :logo="service.logo"
    :readme="service.readme"
  />
  <ServiceDetailsSkeleton v-else />
</template>

<script>
import ServiceDetails from '~/components/ServiceDetails.vue'
import ServiceDetailsSkeleton from '~/components/ServiceDetailsSkeleton.vue'

export default {
  components: {
    ServiceDetails,
    ServiceDetailsSkeleton
  },

  computed: {
    service() {
      const sid = this.$route.params.sid
      return this.$store.state.services.find(service => service.sid === sid)
    }
  }
}
</script>
