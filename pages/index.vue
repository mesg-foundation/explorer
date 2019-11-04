<template>
  <v-container>
    Listing {{ 'service' | pluralize(services.length, true) }}
    <ServiceList :services="services" />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import ServiceList from '~/components/service/List'
export default {
  components: {
    ServiceList
  },
  head() {
    return {
      title: 'Services'
    }
  },
  computed: mapGetters({
    services: 'service/orderedList'
  }),
  fetch: async ({ store }) => {
    await store.dispatch('service/fetchAll', {})
  }
}
</script>
