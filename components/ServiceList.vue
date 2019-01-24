<template>
  <section class="service-list">
    <div class="info">
      Listing <strong>{{ servicesCount }}</strong> services
    </div>
    <div class="services">
      <ServiceItem
        v-for="service in services"
        :key="service.sid"
        :name="service.name"
        :sid="service.sid"
        :description="service.description"
        :logo="service.logo" />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import Fuse from 'fuse.js'

import ServiceItem from '~/components/ServiceItem.vue'

export default {
  components: {
    ServiceItem
  },

  computed: {
    servicesCount() {
      return this.services.length;
    },

    services() {
      var services = this.$store.state.services;
      if (this.search) {
        return new Fuse(this.$store.state.services ,{
          shouldSort: true,
          findAllMatches: true,
          tokenize: true,
          matchAllTokens: true,
          threshold: 0,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 0,
          keys: [
            "name",
            "sid",
            "description"
        ]
        }).search(this.search)
      }
      return services
    },

    ...mapState([
      'search'
    ]),
  }
}
</script>

<style lang="scss" scoped>
.service-list {
  .info {
    color: #666;
    font-size: 13px;
    text-transform: uppercase;
  }
}
</style>