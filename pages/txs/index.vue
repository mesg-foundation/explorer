<template>
  <v-container fluid>
    <v-alert text type="info">Transactions are displayed in real time</v-alert>
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
        <template v-slot:item.gas_wanted="{ item }">
          {{ item.result.gas_wanted }}
        </template>
        <template v-slot:item.gas_used="{ item }">
          {{ item.result.gas_used }}
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
      title: 'Transactions'
    }
  },
  computed: {
    ...mapGetters({
      txs: 'blockchain/sortedTxs'
    }),
    headers() {
      return [
        { text: 'Height', value: 'height' },
        { text: 'Hash', value: 'hash' },
        { text: 'Index', value: 'index' },
        { text: 'Gas wanted', value: 'gas_wanted' },
        { text: 'Gas used', value: 'gas_used' },
        { text: 'Events', value: 'events' }
      ]
    }
  }
}
</script>
