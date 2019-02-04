<template>
  <ServiceDetails v-if="service"
    :name="service.name"
    :sid="service.sid"
    :usid="service.usid"
    :description="service.description"
    logo="https://www.ikwebtasarim.com/public/images/1535613948.png"
    :readme="service.readme"
    :versions="service.versions"
    :variables="service.variables"
    :events="service.events"
    :tasks="service.tasks"
  />
  <div v-loading="true" v-else></div>
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
      return this.$store.state.services.find(service => service.usid === sid)
    }
  },

  beforeCreate: function() {
    document.body.className = 'light';
  }
}
</script>
