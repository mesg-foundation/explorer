<template>
  <v-container>
    {{ 'result' | pluralize(services.length, true) }}
    <ServiceList :services="services" />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import ServiceList from '~/components/service/List'
import refreshable from '~/pages/refreshable'
export default {
  components: {
    ServiceList
  },
  mixins: [refreshable],
  computed: mapGetters({
    services: 'service/orderedList'
  }),
  fetch: async ({ store }) => {
    await store.dispatch('service/fetchAll', {})
  }
}
</script>
