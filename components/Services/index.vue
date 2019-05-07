<template>
  <section class="container">
    <div class="service-list">
      <div class="info">
        Listing <strong>{{ servicesCount }}</strong> services
      </div>
      <div class="services">
        <div v-if="loading">
          <ServiceItemSkeleton/>
          <ServiceItemSkeleton/>
        </div>
        <div v-else>
          <ServiceItem
            v-for="service in services"
            :key="service.sid"
            :service="service"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import Fuse from 'fuse.js'

import ServiceItem from './ServiceItem'
import ServiceItemSkeleton from './ServiceItem/Skeleton'

export default {
  components: {
    ServiceItem,
    ServiceItemSkeleton
  },

  created() {
    this.$store.dispatch('fetchServices');
  },
  
  destroyed() {
    this.$store.commit('updateSearch');
  },

  computed: {
    servicesCount() {
      return this.services.length
    },

    services() {
      var services = this.$store.state.serviceList
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
            'name',
            'sid',
            'services',
            'readme'
          ]
        }).search(this.search)
      }
      return services
    },

    ...mapState([
      'search',
      'loading'
    ]),
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
  max-width: 900px;
  margin: 20px auto 0 auto;
}

.service-list {
  .title {
    font-size: 35px;
    margin-bottom: 25px;
  }

  .info {
    color: #222;
    font-size: 13px;
    text-transform: uppercase;
    font-weight: 400;
  }
}
</style>