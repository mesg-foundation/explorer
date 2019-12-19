<template>
  <v-container>
    <v-card>
      <v-data-table :items="instances" :headers="headers">
        <template v-slot:item.hash="{ value }">
          <nuxt-link :to="`/instances/${value}`">{{ value }}</nuxt-link>
        </template>
        <template v-slot:item.serviceHash="{ value }">
          <nuxt-link :to="`/services/${encode(value)}`">{{
            encode(value)
          }}</nuxt-link>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { encode } from '@mesg/api/lib/util/base58'
export default {
  computed: {
    ...mapGetters({
      list: 'instance/list'
    }),
    headers() {
      return [
        { text: 'Hash', value: 'hash' },
        { text: 'Service', value: 'serviceHash' }
      ]
    },
    instances() {
      return Object.keys(this.list).map((x) => this.list[x])
    }
  },
  fetch: ({ store }) => store.dispatch('instance/list'),
  methods: {
    encode
  }
}
</script>
