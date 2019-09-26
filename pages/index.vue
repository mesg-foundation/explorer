<template>
  <v-container>
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
  computed: mapGetters({
    services: 'service/orderedList'
  }),
  fetch: async ({ store }) => {
    await store.dispatch('service/fetchAll', {})
  }
}
</script>
