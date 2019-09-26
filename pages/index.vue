<template>
  <v-layout column justify-center align-center>
    <ul>
      <li v-for="service in services" :key="service.hash">
        <nuxt-link :to="`/service/${service.hash}`">
          {{ service.hash }}
        </nuxt-link>
      </li>
    </ul>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: mapGetters({
    services: 'service/list'
  }),
  fetch: async ({ store }) => {
    await store.dispatch('service/fetchAll', {})
  }
}
</script>
