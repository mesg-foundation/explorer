<template>
  <v-container>
    <v-card>
      <v-data-table :items="runners" :headers="headers">
        <template v-slot:item.hash="{ value }">
          <nuxt-link :to="`/runners/${value}`">{{ value }}</nuxt-link>
        </template>
        <template v-slot:item.instanceHash="{ value }">
          <nuxt-link :to="`/instances/${encode(value)}`">{{
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
      list: 'runners/list'
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
  fetch: ({ store }) => store.dispatch('runners/list'),
  methods: {
    encode
  }
}
</script>
