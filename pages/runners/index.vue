<template>
  <v-container fluid>
    <v-card>
      <v-data-table :items="runners" :headers="headers">
        <template v-slot:item.hash="{ value }">
          <nuxt-link :to="`/runners/${value}`">{{ value }}</nuxt-link>
        </template>
        <template v-slot:item.instanceHash="{ value }">
          <nuxt-link :to="`/instances/${value}`">{{ value }}</nuxt-link>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  head() {
    return {
      title: 'Runners'
    }
  },
  computed: {
    ...mapGetters({
      list: 'runner/list'
    }),
    headers() {
      return [
        { text: 'Hash', value: 'hash' },
        { text: 'Address', value: 'address' },
        { text: 'Instance', value: 'instanceHash' }
      ]
    },
    runners() {
      return Object.keys(this.list).map((x) => this.list[x])
    }
  },
  fetch: ({ store }) => store.dispatch('runner/list')
}
</script>
