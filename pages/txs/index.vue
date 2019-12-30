<template>
  <v-container fluid>
    <v-card>
      <v-data-table :items="txs" :headers="headers">
        <template v-slot:item.height="{ value }">
          <nuxt-link :to="`/blocks/${value}`">{{ value }}</nuxt-link>
        </template>
        <template v-slot:item.hash="{ value }">
          <nuxt-link :to="`/txs/${value}`">{{ value }}</nuxt-link>
        </template>
        <template v-slot:item.events="{ item }">
          {{ item.result.events.length }}
        </template>
        <template v-slot:item.gasWanted="{ item }">
          {{ item.result.gasWanted }}
        </template>
        <template v-slot:item.gasUsed="{ item }">
          {{ item.result.gasUsed }}
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      txs: 'blockchain/sortedTxs'
    }),
    headers() {
      return [
        { text: 'Height', value: 'height' },
        { text: 'Hash', value: 'hash' },
        { text: 'Index', value: 'index' },
        { text: 'Gas wanted', value: 'gasWanted' },
        { text: 'Gas used', value: 'gasUsed' },
        { text: 'Events', value: 'events' }
      ]
    }
  }
}
</script>
