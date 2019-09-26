<template>
  <v-layout column justify-center align-center>
    {{ service }}
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      services: 'service/list'
    }),
    service() {
      return this.services[this.$route.params.hash]
    }
  },
  fetch: async ({ store, params }) => {
    await store.dispatch('service/fetch', params)
  }
}
</script>
